import { useContext, useState } from 'react';
import styles from './home.module.css'
import { CartContext } from '../context/CartContext'





function Home() {
    const [slideIndex, setSlideIndex] = useState(1);
    const { addToCart } = useContext(CartContext);
    const slides = [
        {
            id: 1,
            img: "https://aip.media/wp-content/uploads/2021/11/logo.png",
            caption: "Caption text",
        },
        {
            id: 2,
            img: "https://m.media-amazon.com/images/M/MV5BYzA2MTAxNjQtMjM1ZC00YjlmLThmOTItYWQ3MWZiM2JjMmZkXkEyXkFqcGc@._V1_.jpg",
            caption: "Caption text",
        },
        {
            id: 3,
            img: "",
            caption: "Caption Text",
        },
    ];

    const plusSlides = (n) => {
        setSlideIndex((prevIndex) => prevIndex + n > slides.length
        ? 1
        : prevIndex + n < 1
        ? slides.length
        : prevIndex + n
        );
    };

    const currentSlide = (n) => {
        setSlideIndex(n);
    }

    return (
        <>
            <div className={styles.home_container}>
            <div className={styles.home_title}>
            <h1>
                Welcome to Retailio!
            </h1>
            </div>
            <div className={styles.description}>
                <h2>
                    Site is still a work in progress! Please navigate to shop for more complete features.
                </h2>
            </div>
            <div className={styles.slideshow_container}>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`${styles.mySlides_fade} ${slideIndex === index + 1 ? styles.active : ""}`}
                        style={{ display: slideIndex === index + 1 ? "block" : "none"}}
                    >
                        <div className={styles.numbertext}>{`${index + 1} / ${slides.length}`}</div>
                        <img src={slide.img} alt={`Slide ${index + 1}`}/>
                        <div className={styles.text}>{slide.caption}</div>
                    </div>
                ))}
            
            <a className={styles.prev} onClick={() => plusSlides(-1)}>
            ❮
          </a>
          <a className={styles.next} onClick={() => plusSlides(1)}>
            ❯
          </a>
            </div>
            <br />
            <div className={styles.dot_container}>
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${slideIndex === index + 1 ? styles.active : ""}`}
                        onClick={() => currentSlide(index + 1)}
                    ></span>
                ))}
            </div>
        </div>
    </>
    );
}

export default Home;