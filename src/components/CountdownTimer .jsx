import { useState, useEffect } from 'react';
import girl from '../assets/girl.jpg';
import bgm from '../assets/hbd.mp3';
import soon from '../assets/soon.gif';
import balloon from '../assets/balloons.png';

const CountdownTimer = () => {
  // Define the target date here
  const [Changelayout,SetChangelayout]=useState(false);
  const [Greeting,setGreeting]=useState('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const targetDate = new Date('Aug 31, 2024 00:00:00');
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      const isAm= currentHour<6;
      if (isAm) {
        setGreeting('Good Morning 🌞');
      } else {
        setGreeting('Good Evening 🌙');
      }
    }
    const calculateTimeRemaining = () => {
      const now = new Date();
      const distance = targetDate.getTime() - now.getTime();
     
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        SetChangelayout(true);
      }
    };
     WishingTime();
    calculateTimeRemaining();
    updateGreeting();
    const intervalId = setInterval(calculateTimeRemaining, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [targetDate]);
    WishingTime();
  function playmusic(){

   const audio =new Audio(bgm);
   audio.play();

  } 
  return (
    <>
    <div className='zone'><h2 className='timezone'>{Greeting}</h2></div>
    <div className='container'>
      <div className='balloon'>
        {Changelayout && <img src={balloon} onClick={playmusic} alt=""/>}
      </div>
    {Changelayout?<h1>happy 24th birthday</h1>:<h1>celebrating in just {timeRemaining.days} Days only</h1>}
      {Changelayout?<img src={girl} className='profile' onClick={playmusic}  alt="girl" />:<img src={soon} className='profile' alt="wait" />}
      {Changelayout?
      <div className='wishbox'>
        <p>Wish many more happy birthday<span>priya</span><br /><span>I</span>wish you all the best in your life in the future</p>
      </div>:
      <div className='timer'> 
        <div className='timeBox'>
          <p>{timeRemaining.days} :</p>
          <span>Days</span>
        </div>
        <div className='timeBox'>
          <p>{timeRemaining.hours} :</p>
          <span>Hours</span>
        </div>
        <div className='timeBox'>
          <p>{timeRemaining.minutes} :</p>
          <span>Minutes</span>
        </div>
        <div className='timeBox'>
          <p>{timeRemaining.seconds}</p>
          <span>Seconds</span>
        </div>
      </div>}
      <div className='Footer'>
        <p>Developed by<a href="https://www.linkedin.com/in/senduru/">@senduru</a></p>
      </div>
    </div>
    </>
  );
};



export default CountdownTimer;
