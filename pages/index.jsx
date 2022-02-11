import PrimaryHeader from "../src/components/PrimaryHeader";
import styles from "../styles/Home.module.css";
import {
  FloatingButton,
  Input,
  Loader,
  QuantityInput,
} from "../src/components/ui/ui";
import SuccessSlider from "../src/components/SuccessSlider";
import Footer from "../src/components/Footer";
import Head from "next/head";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import TestimonialSlider from "../src/components/TestimonialSlider";
import { useRouter } from "next/router";
import ReactTyped from "react-typed";

// export async function getServerSideProps() {
//   const res = await axios.get("/api/home");
//   // const res2 = await axios.get("/api/partner");
//   // const res3 = await axios.get("/api/unit");
//   // var partners = res2.data.partners;
//   // var partners = partners.json();
//   // var units = res3.data.units;
//   // var units = units.json();
//   const data = res.data;
//   console.log("Home page data", res.data.home);
//   var home = data.home;
//   var home = home.json();
//   return {
//     props: { home },
//   };
// }

const HomePage = () => {
  const { t } = useTranslation();
  const textRef = useRef();
  const [partners, setpartners] = useState([]);
  const [regions, setregions] = useState([]);
  const [units, setunits] = useState([]);
  const [home, sethome] = useState(null);
  const router = useRouter();

  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const [productDetails, setproductDetails] = useState({
    productName: "",
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
    quantity: "",
  });

  const getData = async () => {
    const res = await axios.get("/api/home");
    console.log(res.data);
    const { home, partners, regions } = res.data;
    sethome(home);
    setpartners(partners);
    setregions(regions);
  };

  useEffect(() => {
    getData();
    getUnits();
  }, []);

  useEffect(() => {}, []);

  const getUnits = async () => {
    setloading(true);
    const res = await axios.get("/api/unit");
    if (res.status == 200) {
      setunits(res.data.units);
    }

    setloading(false);
  };

  const addEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Type a valid email address");
    }
    try {
      const res = await axios.post("/api/email", { email });
      if (res.status == 201) {
        toast.success("Your Email submitted");
        setemail("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // if (!home) return <Loader />;
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!home) return <Loader />;

  return (
    <>
      <ToastContainer />
      <PrimaryHeader />
      <Head>
        <title>ImpoNexpo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div
          className={styles.hero}
          id="hero"
          style={{ background: `url(${home.hero.image.url})` }}
        >
          <div className={styles.left}>
            <h1> {home.hero.heading} </h1>
            <img src="/images/line.png" alt="" />
            <p>{home.hero.paragraph}</p>
          </div>
          <div className={styles.right}>
            <h2>{home.hero.emailHeading}</h2>
            <form className={styles.email} onSubmit={addEmail}>
              <input
                value={email}
                type="email"
                placeholder={t("email_box_text")}
                required={true}
                onChange={(e) => setemail(e.target.value)}
              />
              <button type="submit" onClick={() => addEmail}>
                {t("email_button_text")}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.signIn}>
          <h2> {home.signin.heading} </h2>

          <ReactTyped
            strings={[...home.signin.texts]}
            typeSpeed={80}
            backSpeed={80}
            // attr="innertext"
            loop
          >
            <h1> </h1>
          </ReactTyped>

          <img src="/images/line.png" alt="" />
          <p>{home.signin.paragraph}</p>
          <Link href="/manufacturer">
            <button> Register Now </button>
          </Link>
        </div>

        <div className={styles.testimonials}>
          <p>{home.facilities.heading}</p>

          <img className={styles.img1} src="/images/dotted3.png" alt="" />
          <img className={styles.img2} src="/images/dotted2.png" alt="" />

          <div className={styles.imagesContainer}>
            <div>
              <div className={styles.imgContainer}>
                <img src="images/overview1.png" alt="" />
                <span>{t("reliable_manufacturer")}</span>
              </div>
              <div className={styles.imgContainer}>
                <img src="images/overview2.png" alt="" />
                <span>{t("solving_language_barrier")} </span>
              </div>

              <div className={styles.imgContainer}>
                <img src="images/overview3.png" alt="" />
                <span>{t("secure_payment")}</span>
              </div>

              <div className={styles.imgContainer}>
                <img src="images/overview4.png" alt="" />
                <span> {t("customer_service")} </span>
              </div>
            </div>

            <div>
              <div className={styles.imgContainer}>
                <img src="images/logistics.jpg" alt="" />
                <span> {t("logistics")} </span>
              </div>
              <div className={styles.imgContainer}>
                <img src="images/overview6.png" alt="" />
                <span> {t("localisation")} </span>
              </div>
            </div>
          </div>
        </div>

        <section className={styles.requirement}>
          <div className={styles.top}>
            <h3>{home.quote.heading}</h3>
            <img src="/images/line.png" alt="" />
            <p>{t("we_connect_with_sellers")}</p>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.left}>
              <div className={styles.about}>
                <p>{t("worlds_best")}</p>
                <h2>{"World’s Best Quality and Secure Sourcing Platform!"}</h2>

                <ul>
                  <li>Submit an RFQ in just one minute.</li>
                  <li>
                    Get multiple quotations from Verified Exporters
                    (Manufacturers, Suppliers and Brands).
                  </li>
                  <li> Compare and choose the best quotation!</li>
                  <li>One request, multiple</li>
                  <li>
                    quotes Verified suppliers matching Quotes comparison and
                    sample request
                  </li>
                </ul>
              </div>

              <div className={styles.industries}>
                <div>
                  <span>2200+</span>
                  <span>categories</span>
                </div>

                <div>
                  <span>1000+</span>
                  <span>Industries</span>
                </div>
              </div>

              <div className={styles.partners}>
                <h2>Featured Trusted Exporting Partners</h2>
                <img src="/images/line.png" alt="" />

                <div>
                  {partners.map((partner, index) => (
                    <img key={index} src={partner.image.url} />
                  ))}
                </div>
              </div>
              <div className={styles.regions}>
                <h2>Exporters come from different Regions</h2>
                <img src="/images/line.png" alt="" />

                <div>
                  {regions.map((region, index) => (
                    <img key={index} src={region.image.url} />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <h1>Tell us your Requirements, and get Multiple Quotes</h1>
              <Input
                placeholder={"Please enter what your Full Name"}
                onChange={(e) =>
                  setproductDetails({ ...productDetails, name: e.target.value })
                }
              />
              <Input
                placeholder={"Please enter your Contact email address"}
                onChange={(e) =>
                  setproductDetails({
                    ...productDetails,
                    email: e.target.value,
                  })
                }
              />
              <Input
                placeholder={"Please enter  your Contact Phone number."}
                onChange={(e) =>
                  setproductDetails({
                    ...productDetails,
                    phoneNumber: e.target.value,
                  })
                }
              />

              <Input
                placeholder={
                  "Please tell us what Product(s) or Services you are looking for.."
                }
                onChange={(e) =>
                  setproductDetails({
                    ...productDetails,
                    productName: e.target.value,
                  })
                }
              />
              <ReactTyped
                strings={[
                  "Please describe the Products or services you are looking for..",
                ]}
                typeSpeed={40}
                backSpeed={20}
                attr="placeholder"
                loop
                smartBackspace
                cursorChar=""
              >
                <textarea
                  name=""
                  id=""
                  onChange={(e) =>
                    setproductDetails({
                      ...productDetails,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </ReactTyped>
              <QuantityInput
                options={units}
                placeholder={"Enter Quantity"}
                onChange={(e) =>
                  setproductDetails({
                    ...productDetails,
                    quantity: e.target.value,
                  })
                }
              />

              <div className={styles.checkbox}>
                <input type="checkbox" id="check" />
                <label htmlFor="check">{t("agree_terms")}</label>
              </div>

              <div className={styles.submitButton}>
                <button>
                  <Link
                    href={`/importer/?name=${productDetails.name}&email=${productDetails.email}&phoneNumber=${productDetails.phoneNumber}&quantity=${productDetails.quantity}&productName=${productDetails.productName}&description=${productDetails.description}`}
                  >
                    {t("submit_requirement")}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.success}>
          <h1>{t("success_stories")} !</h1>
          <img src="/images/line.png" alt="" />

          <div className={styles.slider}>
            <SuccessSlider videos={home.testimonial.videos} />
          </div>

          <div>
            <h1>Read from our Customers</h1>
          </div>

          <div className={styles.successTestimonials}>
            <TestimonialSlider />
          </div>
        </section>

        <section className={styles.contact}>
          <div className={styles.contactBox}>
            <h1>{t("contact_us")} </h1>
            <img src="/images/line.png" alt="" />

            <div className={styles.contacts}>
              <div>
                <h4> {home.contact?.contact1title}</h4>
                <span> {home.contact?.contact1detail} </span>
              </div>
              <div>
                <h4> {home.contact?.contact2title} </h4>
                <span>{home.contact?.contact2detail} </span>
              </div>

              <div>
                <h4>{home.contact?.contact3title} </h4>
                <span>{home.contact?.contact3detail} </span>
              </div>
              <div>
                <h4>{home.contact?.contact4title}</h4>
                <span>{home.contact?.contact4detail} </span>
              </div>
              <div>
                <h4>{home.contact?.contact5title}</h4>
                <span>{home.contact?.contact5detail} </span>
              </div>
              <div>
                <h4>{home.contact?.contact6title}</h4>
                <span>{home.contact?.contact6detail} </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer copyText={home?.footer?.text} />
      <FloatingButton />
    </>
  );
};

export default HomePage;
