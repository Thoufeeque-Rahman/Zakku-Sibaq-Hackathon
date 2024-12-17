import React, { useEffect, useState } from 'react'
import './ZakathTracker.css'
import ZakathTrackerContainer from '../../../Components/ZakathTrackerContainer/ZakathTrackerContainer';
import { Button, Col, Modal, ProgressBar, Row, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function ZakathTracker() {
  const [show, setShow] = useState(false);
  const [editTransaction, setEditTransaction] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    description: '',
    id: null
  });
  const [dailyData, setDailyData] = useState([]);
  const [firstTransaction, setFirstTransaction] = useState();
  const [minBalance, setMinBalance] = useState(0);
  const [zakatDue, setZakatDue] = useState(false);
  const [zakatDueAmount, setZakatDueAmount] = useState(0);
  const [zakatDueTotalAmount, setZakatDueTotalAmount] = useState(0);
  const [zakatDueTodayAmount, setZakatDueTodayAmount] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);



  const navigate = useNavigate();

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const silverPrice = 50;
  const nisabAmount = 595 * silverPrice;

  // useEffect(() => {
  //   // const unsubscribe = auth.onAuthStateChanged((user) => {
  //   //   if (user) {
  //   //     fetchUserData(user);
  //   //   } else {
  //   //     navigate('/login'); // Redirect if not logged in
  //   //   }
  //   // });


  //   const fetchTransactions = async () => {
  //     try {
  //       const docRef = doc(db, "Tracker", user.uid);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         const data = docSnap.data();
  //         setDailyData(data.dailyData || []);

  //         const firstTransaction = new Date(data.firstTransaction);
  //         // setFirstTransaction(firstTransaction);

  //         console.log(firstTransaction);

  //         calculateMinimumBalance(data.dailyData, firstTransaction);
  //       } else {
  //         setError("No document found");
  //       }
  //     } catch (error) {
  //       setError(`Error fetching user data: ${error.message}`);
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchTransactions();
  //   // return () => unsubscribe();

  // }, []);


  console.log("Document data:", dailyData);

  const calculateMinimumBalance = (dailyData, firstTransaction) => {

    console.log(dailyData);

    if (!dailyData || dailyData.length === 0) {
      setMinBalance(0);
      return;
    }

    try {
      if (!firstTransaction) {
        setError("First transaction date is not defined");
        console.log("First transaction date is not defined");
        return;
      }

      console.log(firstTransaction);

      const today = new Date();
      let startDate = new Date();

      const daysDifference = Math.ceil((today - firstTransaction) / (1000 * 60 * 60 * 24));

      if (daysDifference <= 354) {
        startDate = firstTransaction
        console.log('less than 354 days', firstTransaction);

      } else {
        startDate.setDate(today.getDate() - 354);
        console.log('more than 354 days');
      }

      if (isNaN(startDate.getTime())) {
        setError("Invalid start date");
        console.log("Invalid start date");
        return;
      }

      console.log(startDate, today, daysDifference, firstTransaction);
      console.log(firstTransaction)

      let startBalance = 0;
      let currentDate = new Date(startDate);

      console.log('start date: ' + startDate);

      while (currentDate <= today) {
        console.log(new Date(dailyData[0].date).toDateString());
        console.log(currentDate, startBalance);
        const currentDay = dailyData.find(day => new Date(day.date).toDateString() === currentDate.toDateString());
        console.log(currentDay);
        if (currentDay) {
          const transactions = [...(currentDay.income || []), ...(currentDay.expense || [])];
          console.log(transactions);

          if (transactions.length > 0) {
            const latestTransaction = transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

            console.log(latestTransaction);
            if (latestTransaction && typeof latestTransaction.balance === 'number') {
              startBalance = latestTransaction.balance;
              break;
            }
          } else if (typeof currentDay.balance === 'number') {
            startBalance = currentDay.balance;
            break;
          }
        }

        console.log(startBalance);

        currentDate.setDate(currentDate.getDate() - 1);
        console.log(currentDate, startBalance);

        if (startBalance === 0) {
          const startDay = dailyData.find(day => new Date(day.date).toDateString() === startDate.toDateString());
          if (startDay) {
            const transactions = [...(startDay.income || []), ...(startDay.expense || [])];
            const latestTransaction = transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
            if (latestTransaction && typeof latestTransaction.balance === 'number') {
              startBalance = latestTransaction.balance;
            }
          }
        }

        if (currentDate < startDate) {
          startBalance = 0;
        }
      }


      const allBalances = dailyData.reduce((acc, day) => {
        const dayDate = new Date(day.date);
        if (dayDate < startDate || dayDate > today) return acc;

        const transactions = [...(day.income || []), ...(day.expense || [])];
        if (transactions.length === 0) return acc;

        const validBalances = transactions
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .filter(trans => trans && typeof trans.balance === 'number' && trans.balance > 0)
          .map(trans => ({
            date: day.date,
            balance: trans.balance
          }));

        return [...acc, ...validBalances];
      }, []);

      allBalances.push({ date: startDate.toISOString().split('T')[0], balance: startBalance > 0 ? startBalance : 0 });



      if (allBalances.length === 0) {
        setError("No transactions found for the past 354 days");
        console.log(error);
        setMinBalance(0);
        return;
      }

      console.log(allBalances);


      if (allBalances.length === 0) {
        setMinBalance(0);
        return;
      }

      const minBal = Math.min(...allBalances.map(b => b.balance));
      // const minBal = Math.min(...balanceSample.map(b => b.balance));
      console.log('min: ' + minBal);
      setMinBalance(minBal);

      if (minBal >= nisabAmount && daysDifference >= 354) {
        setZakatDue(true);
        setZakatDueAmount(minBal * 0.025);

        submitZakatDue(startDate, minBal, minBal * 0.025);

        console.log('zakatDue: true');
      }



    } catch (error) {
      setError(`Error calculating balance: ${error.message}`);
      console.log(error);
      setMinBalance(0);
    }
  };

  console.log(nisabAmount);

  const submitZakatDue = async (startDate, minBalance, nisab = 30000) => {
    try {
      const docRef = doc(db, "Tracker", user.uid);
      const currentDate = new Date();
      const todayDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
      const periodDays = 354;

      // Fetch existing Zakat due records from Firestore
      const docSnap = await getDoc(docRef);
      let zakatDue = docSnap.exists() ? docSnap.data().zakatDue || [] : [];

      console.log("Existing Zakat Due Records:", zakatDue);

      // Filter records within the last 354 days
      const periodBalances = zakatDue
        .filter((due) => {
          const dueDate = new Date(due.timestamp);
          return dueDate >= startDate && dueDate <= currentDate;
        })
        .map((due) => due.total_liable_amount)
        .filter((amount) => amount != null && !isNaN(amount)); // Safeguard against invalid data

      console.log("Existing Period Balances:", periodBalances);

      // Calculate existing total liable amount for the period
      const existingTotalLiable = periodBalances.reduce(
        (sum, amount) => sum + amount,
        0
      );

      console.log("Existing Total Liable Amount:", existingTotalLiable);

      // Calculate the difference
      const difference = minBalance - existingTotalLiable;
      console.log("Balance Difference:", difference);

      if (difference > 0) {
        // Calculate Zakat due and add to Firestore
        const calculatedZakat = difference * 0.025; // 2.5%
        const newZakatDue = {
          calculated_zakat: calculatedZakat,
          total_liable_amount: difference,
          start_date: startDate.toISOString().split("T")[0],
          end_date: todayDate,
          timestamp: currentDate.toISOString(),
        };

        zakatDue.push(newZakatDue);

        await updateDoc(docRef, { zakatDue });
        console.log("New Zakat Due Added:", newZakatDue);
        setZakatDueTotalAmount(zakatDueTotalAmount + calculatedZakat)
      } else {
        console.log("No new Zakat due. Balance difference is zero or negative.");
      }
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };




  const handleIncomeChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      type: 'income',
    });

    console.log(e.target.value);

    console.log(formData);

  };
  const handleExpenseChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      type: 'expense',
    });

    console.log(e.target.value);

    console.log(formData);

  };

  const handleClose = () => {
    setShow(false);
    setFormData({
      date: '',
      amount: '',
      description: '',
      type: '',
      id: null
    });
    setEditTransaction(false);
  };

  const handleShow = () => {
    setShow(true);
    setFormData(prevFormData => ({
      ...prevFormData,
      date: new Date().toISOString().split('T')[0],
    }));
  };


  const handleIncomeExpenseSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const docRef = doc(db, "Tracker", user.uid);
      const docSnap = await getDoc(docRef);

      let updatedDailyData = [...dailyData];

      if (docSnap.exists()) {
        const existingData = docSnap.data();
        let dailyData = existingData.dailyData || [];

        const dateEntry = dailyData.find(entry => entry.date === formData.date);

        if (dateEntry) {
          if (formData.type === 'income') {
            dateEntry.income.push({
              amount: formData.amount,
              balance: total + parseFloat(formData.amount),
              description: formData.description,
              status: total + parseFloat(formData.amount) >= nisabAmount ? true : false,
              timestamp: new Date().toISOString(),
              type: formData.type,
            });
          } else if (formData.type === 'expense') {
            dateEntry.expense.push({
              amount: formData.amount,
              balance: total - parseFloat(formData.amount),
              description: formData.description,
              status: total - parseFloat(formData.amount) >= nisabAmount ? true : false,
              timestamp: new Date().toISOString(),
              type: formData.type,
            });
          }
        } else {
          dailyData.push({
            date: formData.date,
            income: formData.type === 'income' ? [{
              amount: formData.amount,
              balance: total + parseFloat(formData.amount),
              description: formData.description,
              status: total + parseFloat(formData.amount) >= nisabAmount ? true : false,
              timestamp: new Date().toISOString(),
              type: formData.type,
            }] : [],
            expense: formData.type === 'expense' ? [{
              amount: formData.amount,
              balance: total - parseFloat(formData.amount),
              description: formData.description,
              status: total - parseFloat(formData.amount) >= nisabAmount ? true : false,
              timestamp: new Date().toISOString(),
              type: formData.type,
            }] : []
          });
        }

        const status = dailyData.every(day =>
          (day.income || []).every(income => income.status) &&
          (day.expense || []).every(expense => expense.status)
        );

        await updateDoc(docRef, {
          balance: formData.type === 'income' ? total + parseFloat(formData.amount) : total - parseFloat(formData.amount),
          dailyData: dailyData,
          status: status,
        });

        updatedDailyData = dailyData;
      } else {
        const newDailyData = [{
          date: formData.date,
          nisab: nisabAmount,
          income: formData.type === 'income' ? [{
            amount: formData.amount,
            balance: total + parseFloat(formData.amount),
            description: formData.description,
            status: total + parseFloat(formData.amount) >= nisabAmount ? true : false,
            timestamp: new Date().toISOString(),
            type: formData.type,
          }] : [],
          expense: formData.type === 'expense' ? [{
            amount: formData.amount,
            balance: total - parseFloat(formData.amount),
            status: total - parseFloat(formData.amount) >= nisabAmount ? true : false,
            description: formData.description,
            timestamp: new Date().toISOString(),
            type: formData.type,
          }] : []
        }];

        const status = newDailyData.every(day =>
          day.income.every(income => income.status) &&
          day.expense.every(expense => expense.status)
        );

        newDailyData[0].status = status;

        console.log(newDailyData);


        await setDoc(docRef, {
          balance: formData.type === 'income' ? total + parseFloat(formData.amount) : total - parseFloat(formData.amount),
          firstTransaction: formData.date,
          dailyData: newDailyData,
          zakatDueAmount: 0,
        });

        updatedDailyData = newDailyData;
      }

      const minBalance = Math.min(...dailyData.map(day => day.balance));
      console.log('min' + minBalance);
      setDailyData(updatedDailyData);

      calculateMinimumBalance(dailyData, firstTransaction);


    } catch (error) {
      console.error("Error updating Firestore:", error);
    }


    setFormData({
      date: '',
      amount: '',
      description: '',
      type: 'income'
    });
    handleClose();
  };

  const handleEdit = (transaction, type, date, index) => {
    setFormData({
      date: date,
      amount: transaction.amount,
      description: transaction.description,
      type: type,
      id: transaction.id,
      index: index
    });
    setEditTransaction(true)
    setShow(true);
  };

  const totalIncome = dailyData.reduce((sum, day) => {
    return sum + (day.income?.reduce((daySum, income) => daySum + (parseFloat(income.amount) || 0), 0) || 0);
  }, 0);

  const totalExpenses = dailyData.reduce((sum, day) => {
    return sum + (day.expense?.reduce((daySum, expense) => daySum + (parseFloat(expense.amount) || 0), 0) || 0);
  }, 0);

  const total = totalIncome - totalExpenses;

  const deleteTransaction = async (formData) => {
    const docRef = doc(db, "Tracker", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const existingData = docSnap.data();
      let dailyData = existingData.dailyData || [];

      const dateEntry = dailyData.find(entry => entry.date === formData.date);

      if (dateEntry) {
        if (formData.type === 'income') {
          dateEntry.income.splice(formData.index, 1);
        } else if (formData.type === 'expense') {
          dateEntry.expense.splice(formData.index, 1);
        }

        const updatedBalance = formData.type === 'income' ? total - parseFloat(formData.amount) : total + parseFloat(formData.amount);

        await updateDoc(docRef, {
          balance: updatedBalance,
          dailyData: dailyData,
        });

        setDailyData(dailyData);
      }
    }
    handleClose();
  }

  // Sort dailyData by date in descending order
  const sortedDailyData = [...dailyData].sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      const fetchTransactions = async () => {
        try {
          const docRef = doc(db, "Tracker", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setDailyData(data.dailyData || []);

            const firstTransaction = new Date(data.firstTransaction);
            setFirstTransaction(firstTransaction);

            console.log(firstTransaction);

            calculateMinimumBalance(data.dailyData, firstTransaction);
          } else {
            setError("No document found");
          }
        } catch (error) {
          setError(`Error fetching user data: ${error.message}`);
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      const fetchTodayZakatDue = async () => {
        try {
          const docRef = doc(db, "Tracker", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const zakatDue = data.zakatDue || [];

            const totalZakatDueAmount = zakatDue.reduce((total, due) => total + due.calculated_zakat, 0);
            const today = new Date().toISOString().split('T')[0];

            console.log(today);

            const todayZakatDue = zakatDue.find(due => due.timestamp.split('T')[0] === today);
            console.log(todayZakatDue);

            setZakatDueTodayAmount(todayZakatDue ? todayZakatDue.calculated_zakat : 0);
            setZakatDueTotalAmount(totalZakatDueAmount);
            if (todayZakatDue) {
              setZakatDue(true);
            }
          }
        } catch (error) {
          console.error("Error fetching zakat due:", error);
        }
      };

      const fetchPayments = () => {
        const paymentsRef = query(collection(db, "payments"), where("donorId", "==", user.uid));
        const paymentsSnapshot = getDocs(paymentsRef);

        paymentsSnapshot.then((querySnapshot) => {
          const payments = [];
          querySnapshot.forEach((doc) => {
            payments.push({ id: doc.id, ...doc.data() });
          });

          const validPayments = payments.filter(payment => !payment.exclude);
          const totalPayments = validPayments.reduce((sum, payment) => sum + parseFloat(payment.paidAmount), 0);
          setTotalPayments(totalPayments);
          console.log(payments, totalPayments, validPayments);

        })
      };

      fetchPayments();
      fetchTodayZakatDue();
      fetchTransactions();
    } else {
      navigate('/getStarted')
    }
  }, []);

  useEffect(() => {
    const minimumDate = sortedDailyData.length > 0 ? sortedDailyData[0].date : new Date().toISOString().split('T')[0];
    console.log(minimumDate);

    const dateInputs = document.getElementsByName('date');

    console.log(dateInputs);
    console.log(minimumDate);

    // if (dateInputs.length > 0) {
    //   dateInputs[0].setAttribute('min', minimumDate);
    //   dateInputs[1].setAttribute('min', minimumDate);
    // }
  }, [sortedDailyData]);

  const renderedDailyData = sortedDailyData
    .filter(day => (day.income && day.income.length > 0) || (day.expense && day.expense.length > 0))
    .map((day) => {
      const income = day.income || [];
      const expense = day.expense || [];

      const dayTotalIncome = income.reduce((total, inc) => {
        const amount = parseFloat(inc?.amount || 0);
        return isNaN(amount) ? total : total + amount;
      }, 0);

      const dayTotalExpense = expense.reduce((total, exp) => {
        const amount = parseFloat(exp?.amount || 0);
        return isNaN(amount) ? total : total + amount;
      }, 0);
      return (
        <div className="day-card w-100 container" key={day.date}>
          <Row className='p-0'>
            <Col className='date-section text-center' xs={3}>
              <h2 className='mb-0 fw-semibold' style={{ color: '#000' }}>{new Date(day.date).getDate()}</h2>
              {new Date(day.date).toLocaleString('en-US', { weekday: 'short' }) === 'Fri' ?
                <div className="day bg-success mx-auto px-1 rounded text-white" style={{ width: 'fit-content', fontSize: '14px' }}>
                  <p className='mb-0'>{new Date(day.date).toLocaleString('en-US', { weekday: 'short' })}</p>
                </div>
                :
                <div className="day bg-primary mx-auto px-1 rounded text-white" style={{ width: 'fit-content', fontSize: '14px' }}>
                  <p className='mb-0'>{new Date(day.date).toLocaleString('en-US', { weekday: 'short' })}</p>
                </div>
              }
              <p className='mb-0 text-muted' style={{ fontSize: '12px' }}>{new Date(day.date).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}</p>
            </Col>
            <Col xs={9} className='p-0 pe-2 ps-1'>
              {/* <Row>
                <Col className='income-section text-start pb-1'>
                  <h6 className='fw-semibold border-bottom border-2 pb-1 text-end'><span className="rupee-sign">₹</span> {dayTotalIncome.toFixed(2)}</h6>

                </Col>
                <Col className='expense-section text-start pb-1'>
                  <h6 className='fw-semibold border-bottom border-2 pb-1 text-end'><span className="rupee-sign">₹</span> {dayTotalExpense.toFixed(2)}</h6>

                </Col>
              </Row> */}
              <Col xs={12} className='transactions-section text-start px-0 py-3'>
                {income.concat(expense).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((transaction, index) => (
                  <div className='d-flex' key={index} onClick={() => handleEdit(transaction, transaction.type, day.date, index)}>
                    <p className='mb-' style={{ fontSize: '12px' }}><span style={{ color: transaction.type === 'income' ? 'var(--primary-color)' : transaction.type === 'expense' ? '#fd7e14' : 'black', fontSize: '18px' }}>•</span> {transaction.description ? transaction.description : <span className='text-muted ' style={{ fontSize: '12px' }}>(No Description)</span>}</p>
                    <div className='ms-auto'>
                      <h6 className='text-end mt-2 mb-0' style={{ color: transaction.type === 'income' ? 'var(--primary-color)' : transaction.type === 'expense' ? '#fd7e14' : 'black' }} ><span className="rupee-sign">₹</span> {parseFloat(transaction.amount).toFixed(2)}</h6>
                      {/* <p className='mb-2 text-end text-muted' style={{ fontSize: '10px' }}>(Bal. {transaction.balance})</p> */}
                    </div>
                  </div>
                ))}
              </Col>
            </Col>
          </Row>
        </div>
      );
    })
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div>
      {/* {error && <div className="error-message">{error}</div>} */}
      {loading ? (
        <div className='vh-100'>Loading...</div>
      ) : (
        <>
          <div className="container-box">
            <div className="zakat-tracker-box">
              <div className="header">
                <div className="header-text d-flex justify-content-start">
                  <svg onClick={handleBackClick} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left me-3">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                  </svg>
                  <div>
                    <h1>Zakat Tracker</h1>
                  </div>
                </div>
              </div>
              <div className="zakat-tracker-body pb-4">
                <div className="total-box row w-100 mx-auto">
                  <div className="income text-center col">
                    <h4>Income</h4>
                    <h6><span className="rupee-sign">₹</span> {parseFloat(totalIncome).toFixed(2)}</h6>
                  </div>
                  <div className="expense text-center col border-end border-start">
                    <h4>Expense</h4>
                    <h6><span className="rupee-sign">₹</span> {parseFloat(totalExpenses).toFixed(2)}</h6>
                  </div>
                  <div className="Total text-center col">
                    <h4>Balance</h4>
                    <h6><span className="rupee-sign">₹</span> {parseFloat(total).toFixed(2)}</h6>
                  </div>
                </div>
                {/* <ZakathTrackerContainer now={245} tracker={true} /> */}

                <Row className="nisab-zakat-box mx-auto mt-4 container row-gap-2  ">
                  <Col xs={6} className='nisab-amount-box'>
                    <h4 className='text-center fs-6 mb-2 text-muted' >Nisab Amount</h4>
                    <h6 className='text-center mb-0' style={{ color: 'var(--text-color)' }}><span className="rupee-sign">₹</span> {parseFloat(nisabAmount).toFixed(2)}</h6>
                  </Col>
                  {zakatDueTodayAmount ? (
                    <Col xs={6} className='zakat-due-box'>
                      <h4 className='text-center fs-6  mb-2 text-muted '>Today's Zakat</h4>
                      <h6 className='text-center mb-0' style={{ color: 'var(--text-color)' }}><span className="rupee-sign">₹</span> {parseFloat(zakatDueTodayAmount).toFixed(2)}</h6>
                    </Col>
                  ) : (
                    <Col xs={6} className='zakat-due-box'>
                      <h4 className='text-center fs-6 mb-2 text-muted '>Today's Zakat</h4>
                      <h6 className='text-center mb-0' style={{ color: 'var(--text-color)' }}><span className="rupee-sign">₹</span> 0</h6>
                    </Col>
                  )}
                  {zakatDue ? (
                    <Col xs={12} className='zakat-due-box border-top pt-2'>
                      <h4 className='text-center fs-6  mb-2 text-muted '>Total Zakat Due (including today)</h4>
                      <h6 className='text-center mb-0' style={{ color: 'var(--text-color)' }}><span className="rupee-sign">₹</span> {zakatDueTotalAmount - totalPayments < 0 ? 0 : parseFloat(zakatDueTotalAmount - totalPayments).toFixed(2)}</h6>
                    </Col>
                  ) : (
                    <Col xs={12} className='zakat-due-box border-top pt-2'>
                      <h4 className='text-center fs-6 mb-2 text-muted '>Total Zakat Due (including today)</h4>
                      <h6 className='text-center mb-0' style={{ color: 'var(--text-color)' }}><span className="rupee-sign">₹</span> 0 </h6>
                    </Col>
                  )}
                </Row>

                <div className="daily-box px-2 mt-4">
                  <h2 className='fs-4 fw-semibold border-bottom border-2 w-50 mb-3 ms-4 ' style={{ color: 'var(--primary-color)' }}>Transactions</h2>
                  {renderedDailyData}
                </div>

                {/* <Tabs defaultActiveKey="daily" id="uncontrolled-tab-example" className="mb-3 mt-4">
                  <Tab eventKey="daily" title="Daily">
                  </Tab>
                  <Tab eventKey="monthly" title="Monthly">
                    <h3 className='text-center'>Work on progress</h3>
                  </Tab>
                </Tabs> */}

                <Button className='add-new' onClick={handleShow}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                </Button>

                <Modal show={show} onHide={handleClose} centered>
                  <form>
                    {/* <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header> */}
                    <Modal.Body>
                      <Tabs defaultActiveKey={formData.type === 'income' ? 'income' : formData.type === 'expense' ? 'Expense' : 'income'} id="uncontrolled-tab-example" className="mb-3 mt-4">
                        <Tab eventKey="income" title="Income">
                          <div className="income-form ">
                            <div className="d-flex">
                              {editTransaction && (
                                <Button
                                  style={{
                                    border: '1px solid #dc3545',
                                    backgroundColor: '#dc3545',
                                    padding: '2px',
                                    boxShadow: 'none',
                                    transition: 'all 0.3s',
                                  }}
                                  className='ms-auto rounded-2 d-flex align-self-center'
                                  onClick={() => deleteTransaction(formData)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                  </svg>
                                </Button>
                              )}
                            </div>
                            <div className="form-group w-100">
                              <label htmlFor="exampleInputPassword1">Date</label>
                              <input type="date" value={formData.date} onChange={handleIncomeChange} className="form-control" required id="date" name='date' />
                            </div>
                            <div className="amount-group mt-3">
                              <label for="amount">Amount</label>
                              <div class="input-group mb-3 p-0 border-0 d-flex">
                                <span class="input-group-text rupee-sign" style={{ height: '45px' }}>₹</span>
                                <input
                                  name='amount'
                                  id='amount'
                                  type="number"
                                  value={formData.amount}
                                  required
                                  onChange={handleIncomeChange}
                                  placeholder='eg: 500'
                                  class="form-control"
                                  aria-label="Amount (to the nearest dollar)"
                                  style={{
                                    borderRadius: '0.25rem',
                                    borderTopRightRadius: '15px',
                                    borderBottomRightRadius: '15px',
                                    borderTopLeftRadius: '0',
                                    borderBottomLeftRadius: '0',
                                    height: '45px'

                                  }} />
                              </div>
                            </div>
                            <div className="form-group w-100">
                              <label htmlFor="exampleInputPassword1">Description</label>
                              <input type="text" value={formData.description} onChange={handleIncomeChange} className="form-control" id="description" name='description' />
                            </div>
                            <div className="d-flex justify-content-center gap-2 mt-3">

                              <Button style={{
                                border: '1px solid #fa4b4b',
                                backgroundColor: '#fa4b4b',
                                borderRadius: '50px',
                                padding: '5px 20px',
                                boxShadow: 'none',
                                transition: 'all 0.3s',
                              }} onClick={handleClose}>
                                Close
                              </Button>
                              <Button style={{
                                border: '1px solid var(--primary-color)',
                                backgroundColor: 'var(--primary-color)',
                                borderRadius: '50px',
                                padding: '5px 20px',
                                boxShadow: 'none',
                                transition: 'all 0.3s',
                              }} onClick={handleIncomeExpenseSubmit}>
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey="Expense" title="Expense">
                          <div className="expense-form">
                            <div className="d-flex">
                              {editTransaction && (
                                <Button
                                  style={{
                                    border: '1px solid #dc3545',
                                    backgroundColor: '#dc3545',
                                    borderRadius: '5px',
                                    padding: '2px',
                                    boxShadow: 'none',
                                    transition: 'all 0.3s',
                                  }}
                                  className='ms-auto d-flex align-self-center'
                                  onClick={() => deleteTransaction(formData)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                  </svg>
                                </Button>
                              )}
                            </div>
                            <div className="form-group w-100">
                              <label >Date</label>
                              <input type="date" value={formData.date} onChange={handleExpenseChange} className="form-control" required id="date" name='date' />
                            </div>
                            <div className="amount-group mt-3">
                              <label for="amount">Amount</label>
                              <div class="input-group mb-3 p-0 border-0 d-flex">
                                <span class="input-group-text rupee-sign" style={{ height: '45px' }}>₹</span>
                                <input
                                  name='amount'
                                  id='amount'
                                  type="number"
                                  value={formData.amount}
                                  required
                                  onChange={handleExpenseChange}
                                  placeholder='eg: 500'
                                  class="form-control"
                                  aria-label="Amount (to the nearest dollar)"
                                  style={{
                                    borderRadius: '0.25rem',
                                    borderTopRightRadius: '15px',
                                    borderBottomRightRadius: '15px',
                                    borderTopLeftRadius: '0',
                                    borderBottomLeftRadius: '0',
                                    height: '45px'

                                  }} />
                              </div>
                            </div>
                            <div className="form-group w-100">
                              <label htmlFor="exampleInputPassword1">Description</label>
                              <input type="text" value={formData.description} onChange={handleExpenseChange} className="form-control" id="description" name='description' />
                            </div>
                            <div className="d-flex justify-content-center gap-2 mt-3">
                              <Button style={{
                                border: '1px solid #fa4b4b',
                                backgroundColor: '#fa4b4b',
                                borderRadius: '50px',
                                padding: '5px 20px',
                                boxShadow: 'none',
                                transition: 'all 0.3s',
                              }} onClick={handleClose}>
                                Close
                              </Button>
                              <Button style={{
                                border: '1px solid #fd7e14',
                                backgroundColor: '#fd7e14',
                                borderRadius: '50px',
                                padding: '5px 20px',
                                boxShadow: 'none',
                                transition: 'all 0.3s',
                              }} onClick={handleIncomeExpenseSubmit}>
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
                    </Modal.Body>
                  </form>
                </Modal>
              </div>
            </div>
          </div >
        </>
      )}
    </div>
  )
}

export default ZakathTracker

