import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import useStore from "../StoreZustand/store";

const NumberCards = () => {
  const url = "http://localhost:4000/app/blood/fetch";
  const [bloodDonation, setBloodDonation] = useState([]);
  const [foodAndCloth, setFoodAndCloth] = useState([]);
  const [fund, setFund] = useState([]);
  const { topDonors, totalAmount } = useStore();
  const [numbers, setNumbers] = useState([0, 0, 0, 0, 0]);
  const [isAnimated, setIsAnimated] = useState(false);

  const cardRef = useRef(null);

  useEffect(() => {
    const fetchBloodDonations = async () => {
      try {
        const responseBlood = await axios.get(url);

        setBloodDonation(responseBlood.data.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBloodDonations();
  }, []);

  useEffect(() => {}, [bloodDonation]);

  useEffect(() => {
    const fetchFoodAndClothDonations = async () => {
      try {
        const responseFoodAndCloth = await axios.get(
          "http://localhost:4000/app/fc-collection/fetch"
        );

        setFoodAndCloth(responseFoodAndCloth.data.data.length);
      } catch (err) {
        setError("Failed to fetch blood donations. Please try again later.");
        console.error(err);
      }
    };

    fetchFoodAndClothDonations();
  }, []);

  useEffect(() => {}, [foodAndCloth]);

  useEffect(() => {
    const fetchFund = async () => {
      try {
        const responseFetchFund = await axios.get(
          "http://localhost:4000/app/fund/fetch"
        );
        const data = responseFetchFund.data;
      } catch (err) {
        console.error(err);
      }
    };

    fetchFund();
  }, []);

  useEffect(() => {}, [fund]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !isAnimated &&
            bloodDonation > 0 &&
            foodAndCloth > 0
          ) {
            setIsAnimated(true);
            animateNumbers(
              0,
              [totalAmount, bloodDonation, topDonors.length, foodAndCloth],
              3000
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [isAnimated, bloodDonation, foodAndCloth, topDonors.length, totalAmount]);

  const animateNumbers = (start, endValues, duration) => {
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setNumbers(
        endValues.map((endValue) =>
          Math.floor(progress * (endValue - start) + start)
        )
      );

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <div>
      <section className="bg-gray-25 pt-10">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-32"
          ref={cardRef}
        >
          {[
            // { img: assets.form, text: "Beneficiaries Impacted" },
            { img: assets.money_bag, text: "Aid Generated" },
            { img: assets.patient, text: "Blood Distributed" },
            { img: assets.success, text: "Active Doner" },
            { img: assets.delivery, text: "Food Distributed" },
          ].map((card, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center border bg-white p-4"
            >
              <img
                src={card.img}
                alt={card.text}
                className="w-20 h-auto rounded-lg p-2"
              />
              <p className="text-5xl p-2 text-[#007BFF]">
                {index === 0
                  ? `${numbers[index]}+`
                  : `${numbers[index].toLocaleString()}+`}
              </p>
              <p className="text-2xl p-2">{card.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NumberCards;
