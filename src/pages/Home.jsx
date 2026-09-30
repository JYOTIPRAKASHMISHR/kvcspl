import React, { useEffect, useRef, useState } from "react";
import "../styles/Home.css";

import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginPopup from "../components/LoginPopup";

// Technology / service images
import webIcon from "../assets/web.png";
import mobileIcon from "../assets/mobile.png";
import uiuxIcon from "../assets/uiux.png";
import icon09 from "../assets/icon09.png";
import img3 from "../assets/img3.png";
import Training from "../assets/talent.png";
import HR1 from "../assets/hr1.png";
import Strategic from "../assets/startrgy.png";
import apiIcon from "../assets/api.png";
import supportIcon from "../assets/support.png";
import cloudIcon from "../assets/cloud.png";

// Technology stack
import react from "../assets/react.png";
import node from "../assets/node.png";
import python from "../assets/python.png";
import java from "../assets/java.png";
import flutter from "../assets/flutter.png";
import reactNative from "../assets/reactnative.png";
import aws from "../assets/aws.png";
import firebase from "../assets/firebase.png";
import mongo from "../assets/mongo.png";
import postgres from "../assets/postgres.png";
import docker from "../assets/docker.png";
import kubernetes from "../assets/kubernetes.png";

// Icons
import {
  Star,
  Users,
  BadgeCheck,
  Eye,
  Clock,
  Headphones,
  Shield,
  BarChart2,
  RefreshCcw,
  Banknote,
  ReceiptIndianRupee,
  FileSpreadsheet,
  Calculator,
  WalletCards,
  ChartNoAxesCombined,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
  UserRoundCog,
  Landmark,
  CircleDollarSign,
  FileCheck2,
  ReceiptText,
  BarChart3,
} from "lucide-react";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase";
import {
  ref,
  push,
  set,
  serverTimestamp,
} from "firebase/database";

/* =========================================================
   TESTIMONIALS
========================================================= */

const testimonials = [
  {
    text: "KVCSPL helped us improve our digital operations with a scalable software solution and continuous technical support.",
    name: "Aarav Sharma",
    role: "CTO, Technology Company",
    img: "https://i.pravatar.cc/80?img=12",
  },
  {
    text: "The team understood our business requirements clearly and delivered a solution that improved our workflow.",
    name: "Riya Mehta",
    role: "Product Manager, Growing Business",
    img: "https://i.pravatar.cc/80?img=32",
  },
  {
    text: "Their combination of technology, HR support and business services makes them a valuable long-term partner.",
    name: "Anjali Nair",
    role: "Founder, SME",
    img: "https://i.pravatar.cc/80?img=45",
  },
];

/* =========================================================
   FAQ
========================================================= */

const faqs = [
  {
    question: "What HR and Compliance services do you provide?",
    answer:
      "We offer HR and compliance support including labour law compliance, PF, ESI, POSH, payroll support, talent acquisition, HR documentation, employee policies and related business support.",
  },

  {
    question: "Do you provide Accounting & Bookkeeping support?",
    answer:
      "Yes. We provide accounting and bookkeeping support including transaction recording, invoice management, expense tracking, accounts payable and receivable support, bank reconciliation, financial record maintenance and management reporting support.",
  },

  {
    question: "Do you provide Vendor Reconciliation?",
    answer:
      "Yes. Our vendor reconciliation support helps compare vendor invoices, payments, credit notes, ledger balances and outstanding amounts to identify mismatches and maintain accurate payable records.",
  },

  {
    question: "Do you provide Creditor Reconciliation?",
    answer:
      "Yes. We support creditor reconciliation by reviewing creditor ledgers, invoices, payments, credit notes and outstanding balances to help maintain accurate financial records.",
  },

  {
    question: "Do you provide GST Reconciliation?",
    answer:
      "Yes. We provide GST reconciliation support by comparing relevant accounting records and available GST data to identify mismatches, missing entries and differences that require review.",
  },

  {
    question: "Do you provide Balance Sheet & Tax Audit Support?",
    answer:
      "We provide balance-sheet review, reconciliation, documentation and tax-related audit preparation support based on the applicable professional scope and business requirements.",
  },

  {
    question: "Can you support our day-to-day accounting activities?",
    answer:
      "Yes. Depending on your business requirements, our accounting support can assist with routine bookkeeping, invoice records, expense records, reconciliation and preparation of organized financial information for management or professional review.",
  },

  {
    question: "Do you provide GST, TDS and statutory accounting support?",
    answer:
      "We can provide accounting and compliance support related to business records, documentation and statutory requirements. Specific filings or professional certifications can be handled according to the applicable scope and professional requirements.",
  },

  {
    question: "Do you provide recruitment services?",
    answer:
      "Yes. We support technical and non-technical recruitment, candidate screening, campus hiring, onboarding and HR documentation.",
  },

  {
    question: "How do you handle payroll and statutory deductions?",
    answer:
      "We support payroll processing and related statutory calculations such as PF, ESI, Professional Tax and TDS based on the applicable requirements.",
  },

  {
    question: "Do you offer HR support for startups and SMEs?",
    answer:
      "Yes. Our HR support can be structured according to the size and requirements of startups, SMEs and growing organizations.",
  },

  {
    question: "What software development services do you provide?",
    answer:
      "We provide web applications, mobile applications, SaaS platforms, UI/UX design, APIs, cloud solutions, DevOps, integrations and custom software development.",
  },

  {
    question: "How long does a software project take?",
    answer:
      "Project timelines depend on scope, features, integrations and technology requirements. After understanding the requirements, we provide a project roadmap and estimated timeline.",
  },

  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes. We provide maintenance, bug fixing, security updates, performance optimization, cloud support and feature enhancement services.",
  },

  {
    question: "Can you work with existing or legacy systems?",
    answer:
      "Yes. We can work with existing applications and legacy systems for enhancement, integration, migration and modernization.",
  },

  {
    question: "What technologies do you work with?",
    answer:
      "Our technology stack includes React, Node.js, Python, Java, Spring Boot, Flutter, React Native, Firebase, AWS, MongoDB, PostgreSQL, Docker, Kubernetes and other modern technologies.",
  },
];

/* =========================================================
   FEATURES
========================================================= */

const features = [
  {
    icon: <Eye size={25} />,
    title: "Complete Transparency",
    desc: "Clear communication and visibility throughout the engagement.",
  },

  {
    icon: <Clock size={25} />,
    title: "Timely Delivery",
    desc: "Structured execution focused on realistic project timelines.",
  },

  {
    icon: <Headphones size={25} />,
    title: "Dedicated Support",
    desc: "Continuous assistance for technology and business operations.",
  },

  {
    icon: <Shield size={25} />,
    title: "Security Focus",
    desc: "Security-conscious development and responsible data handling.",
  },

  {
    icon: <BarChart2 size={25} />,
    title: "Scalable Solutions",
    desc: "Solutions designed to grow with your organization.",
  },

  {
    icon: <RefreshCcw size={25} />,
    title: "Continuous Improvement",
    desc: "Iterative processes focused on long-term business value.",
  },
];

/* =========================================================
   TECHNOLOGY STACK
========================================================= */

const techStack = [
  { icon: react, name: "React" },
  { icon: node, name: "Node.js" },
  { icon: python, name: "Python" },
  { icon: java, name: "Java" },
  { icon: flutter, name: "Flutter" },
  { icon: reactNative, name: "React Native" },
  { icon: aws, name: "AWS" },
  { icon: firebase, name: "Firebase" },
  { icon: mongo, name: "MongoDB" },
  { icon: postgres, name: "PostgreSQL" },
  { icon: docker, name: "Docker" },
  { icon: kubernetes, name: "Kubernetes" },
];

/* =========================================================
   SERVICES
========================================================= */

const services = [
  /* ================= HR & COMPLIANCE ================= */

  {
    category: "HR & Compliance",
    icon: img3,
    title: "Statutory Compliance",
    desc:
      "Professional support for labour law compliance, POSH requirements, licensing and applicable Shops & Establishments and Factories Act requirements.",
  },

  {
    category: "HR & Compliance",
    icon: Banknote,
    isComponent: true,
    title: "Payroll & Benefits",
    desc:
      "Accurate payroll support including PF, ESI, Professional Tax, TDS-related calculations and employee compensation records.",
  },

  {
    category: "HR & Compliance",
    icon: icon09,
    title: "Talent Acquisition",
    desc:
      "End-to-end recruitment support from candidate sourcing and screening to onboarding and HR documentation.",
  },

  {
    category: "HR & Compliance",
    icon: HR1,
    title: "HR Operations & Outsourcing",
    desc:
      "Flexible HR support for startups and SMEs including employee documentation, policies, onboarding and performance management.",
  },

  {
    category: "HR & Compliance",
    icon: Training,
    title: "Training & Development",
    desc:
      "Customized leadership, soft-skills, workforce development and compliance-oriented training programs.",
  },

  {
    category: "HR & Compliance",
    icon: Strategic,
    title: "Strategic Advisory",
    desc:
      "Business guidance around workforce practices, labour reforms, wage-related requirements and organizational processes.",
  },

  /* ================= ACCOUNTING & FINANCE ================= */

  {
    category: "Accounting & Finance",
    icon: Calculator,
    isComponent: true,
    title: "Accounting & Bookkeeping Support",
    desc:
      "Reliable day-to-day accounting assistance including bookkeeping, transaction recording, invoice management, expense tracking and organized financial records.",
  },

  {
    category: "Accounting & Finance",
    icon: ReceiptIndianRupee,
    isComponent: true,
    title: "Invoicing & Receivables Support",
    desc:
      "Support for invoice records, receivables tracking, payment follow-ups and maintaining organized customer transaction information.",
  },

  {
    category: "Accounting & Finance",
    icon: WalletCards,
    isComponent: true,
    title: "Accounts Payable Support",
    desc:
      "Assistance with vendor records, purchase invoices, expense documentation and payable tracking to improve financial workflow.",
  },

  {
    category: "Accounting & Finance",
    icon: FileSpreadsheet,
    isComponent: true,
    title: "Bank Reconciliation & Records",
    desc:
      "Support for bank reconciliation, transaction verification and maintaining accurate and organized accounting records.",
  },

  {
    category: "Accounting & Finance",
    icon: ChartNoAxesCombined,
    isComponent: true,
    title: "MIS & Financial Reporting Support",
    desc:
      "Structured financial information and management reports to help businesses monitor expenses, revenue and operational performance.",
  },

  {
    category: "Accounting & Finance",
    icon: Landmark,
    isComponent: true,
    title: "Accounting Compliance Support",
    desc:
      "Organized accounting documentation and support for applicable GST, TDS and statutory accounting requirements based on business needs.",
  },

  /* ================= NEW ACCOUNTING SERVICES ================= */

  {
    category: "Accounting & Finance",
    icon: Calculator,
    isComponent: true,
    title: "Vendor Reconciliation",
    desc:
      "Detailed reconciliation of vendor accounts, invoices, payments, outstanding balances and ledger entries to identify mismatches and maintain accurate payable records.",
  },

  {
    category: "Accounting & Finance",
    icon: FileCheck2,
    isComponent: true,
    title: "Creditor Reconciliation",
    desc:
      "Systematic reconciliation of creditor ledgers with invoices, payments, credit notes and outstanding balances to improve accuracy and financial control.",
  },

  {
    category: "Accounting & Finance",
    icon: ReceiptText,
    isComponent: true,
    title: "GST Reconciliation",
    desc:
      "GST reconciliation support covering purchase records, sales data, tax ledgers and available GST data to identify mismatches and improve compliance readiness.",
  },

  {
    category: "Accounting & Finance",
    icon: BarChart3,
    isComponent: true,
    title: "Balance Sheet & Tax Audit Support",
    desc:
      "Support for balance-sheet review, account reconciliation, tax-related documentation and audit preparation to help maintain accurate and organized financial records.",
  },

  /* ================= TECHNOLOGY ================= */

  {
    category: "Technology",
    icon: webIcon,
    title: "Web Development",
    desc:
      "Custom web applications built with modern frameworks and technologies for performance, scalability and excellent user experience.",
  },

  {
    category: "Technology",
    icon: mobileIcon,
    title: "Mobile App Development",
    desc:
      "Native and cross-platform mobile applications for Android and iOS with seamless functionality and modern interfaces.",
  },

  {
    category: "Technology",
    icon: uiuxIcon,
    title: "UI/UX Design",
    desc:
      "User-centered design solutions focused on intuitive interfaces, accessibility and engaging digital experiences.",
  },

  {
    category: "Technology",
    icon: cloudIcon,
    title: "Cloud & DevOps",
    desc:
      "Scalable cloud infrastructure and DevOps solutions designed for reliable, secure and efficient application operations.",
  },

  {
    category: "Technology",
    icon: apiIcon,
    title: "API Integration",
    desc:
      "Secure and efficient API integrations that connect systems, enable data flow and extend application functionality.",
  },

  {
    category: "Technology",
    icon: supportIcon,
    title: "Maintenance & Support",
    desc:
      "Ongoing technical maintenance, bug fixes, security updates, performance optimization and application support.",
  },
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* =========================================================
   HOME COMPONENT
========================================================= */

const Home = () => {
  /* ================= FORM ================= */

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const projectRef = ref(database, "project_requests");
      const newProjectRef = push(projectRef);

      await set(newProjectRef, {
        ...formData,
        createdAt: serverTimestamp(),
        status: "new",
      });

      alert("✅ Project request submitted successfully!");

      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
      });
    } catch (error) {
      console.error("Project submission error:", error);
      alert("❌ Failed to submit your request.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FAQ ================= */

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) =>
      prev === index ? null : index
    );
  };

  /* ================= LOGIN POPUP ================= */

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        if (!localStorage.getItem("loginPopupShown")) {
          setShowLoginPopup(true);
          localStorage.setItem(
            "loginPopupShown",
            "true"
          );
        }
      } else {
        setShowLoginPopup(false);

        localStorage.setItem(
          "loginPopupShown",
          "true"
        );
      }
    });

    return () => unsubscribe();
  }, []);

  /* ================= LENIS SMOOTH SCROLL ================= */

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) =>
        1 - Math.pow(1 - t, 4),
    });

    let animationFrame;

    const raf = (time) => {
      lenis.raf(time);
      animationFrame =
        requestAnimationFrame(raf);
    };

    animationFrame =
      requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  /* ================= HERO VIDEO ================= */

  const videos = [
    "/videos/video.mp4",
    "/videos/techvideo.mp4",
    "/videos/llastvideo.mp4",
  ];

  const videoRef = useRef(null);
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.src = videos[videoIndex];

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log(
          "Autoplay blocked:",
          err
        );
      });
    }

    const handleEnd = () => {
      setVideoIndex(
        (prev) =>
          (prev + 1) % videos.length
      );
    };

    video.addEventListener(
      "ended",
      handleEnd
    );

    return () => {
      video.removeEventListener(
        "ended",
        handleEnd
      );
    };
  }, [videoIndex]);

  /* ================= TESTIMONIAL ================= */

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(
      (prev) =>
        (prev + 1) %
        testimonials.length
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0
        ? testimonials.length - 1
        : prev - 1
    );
  };

  /* ================= MOBILE / SCROLL ================= */

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const scrollToProject = () => {
    document
      .getElementById("requestproject")
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setIsMenuOpen(false);
  };

  /* ================= SERVICE ICON ================= */

  const renderServiceIcon = (service) => {
    if (service.isComponent) {
      const IconComponent = service.icon;

      return (
        <IconComponent
          size={38}
          strokeWidth={1.7}
        />
      );
    }

    return (
      <img
        src={service.icon}
        alt={service.title}
      />
    );
  };

  return (
    <>
      <Navbar />

      {/* LOGIN POPUP */}

      {showLoginPopup && (
        <LoginPopup
          onClose={() =>
            setShowLoginPopup(false)
          }
        />
      )}

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="home-section premium-hero">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid-bg" />

        <div className="home-container">
          <motion.div
            className="home-left"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              className="trust-badge"
              variants={fadeUp}
            >
              <Sparkles size={15} />

              Trusted Business & Technology
              Solutions
            </motion.div>

            <motion.h1
              className="hero-title"
              variants={fadeUp}
            >
              Technology.
              <br />

              <span>People.</span>
              <br />

              <strong>
                Business Growth.
              </strong>
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              variants={fadeUp}
            >
              KVCSPL combines technology, HR,
              compliance, accounting support and
              business solutions to help
              organizations operate smarter, scale
              efficiently and grow with confidence.
            </motion.p>

            <motion.div
              className="hero-buttons"
              variants={fadeUp}
            >
              <button
                className="btn primary"
                onClick={scrollToProject}
              >
                Start a Conversation
                <ArrowRight size={18} />
              </button>

              <button
                className="btn secondary"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Explore Services
              </button>
            </motion.div>

            <motion.div
              className="hero-stats"
              variants={fadeUp}
            >
              <div>
                <strong>
                  Technology
                </strong>
                <span>
                  Digital Solutions
                </span>
              </div>

              <div>
                <strong>
                  HR & Finance
                </strong>
                <span>
                  Business Support
                </span>
              </div>

              <div>
                <strong>
                  Growth
                </strong>
                <span>
                  Long-Term Partnership
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* HERO VISUAL */}

          <motion.div
            className="home-right hero-visual-wrapper"
            initial={{
              opacity: 0,
              x: 80,
              rotateY: -12,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotateY: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <motion.div
              className="hero-visual-card"
              animate={{
                y: [0, -10, 0],
                rotateX: [
                  0,
                  1.5,
                  0,
                ],
                rotateY: [
                  0,
                  -1.5,
                  0,
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="hero-image-glow" />

              <video
                ref={videoRef}
                className="hero-video"
                autoPlay
                muted
                playsInline
              />

              <div className="hero-floating-card card-one">
                <Code2 size={20} />

                <div>
                  <strong>
                    Technology
                  </strong>

                  <span>
                    Digital Solutions
                  </span>
                </div>
              </div>

              <div className="hero-floating-card card-two">
                <CircleDollarSign
                  size={20}
                />

                <div>
                  <strong>
                    Accounting
                  </strong>

                  <span>
                    Financial Support
                  </span>
                </div>
              </div>

              <div className="hero-floating-card card-three">
                <UserRoundCog
                  size={20}
                />

                <div>
                  <strong>
                    HR & Compliance
                  </strong>

                  <span>
                    Business Operations
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        id="services"
        className="services-section premium-section"
      >
        <div className="section-heading-wrapper">
          <motion.div
            className="section-tag"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            WHAT WE DO
          </motion.div>

          <motion.h2
            className="section-title"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            Comprehensive Solutions
            <br />
            <span>
              For Modern Businesses
            </span>
          </motion.h2>

          <motion.p
            className="section-desc"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            From software development and cloud
            infrastructure to HR, compliance and
            accounting support, KVCSPL provides
            practical solutions across key areas of
            business operations.
          </motion.p>
        </div>

        <motion.div
          className="services-cards"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
        >
          {services.map(
            (service, index) => (
              <motion.div
                className="service-card premium-service-card"
                key={`${service.title}-${index}`}
                variants={fadeUp}
                whileHover={{
                  y: -12,
                  rotateX: 3,
                  rotateY:
                    index % 2 === 0
                      ? -2
                      : 2,
                  scale: 1.015,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <div className="service-number">
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </div>

                <div className="service-category">
                  {service.category}
                </div>

                <div className="icon-box premium-icon-box">
                  {renderServiceIcon(
                    service
                  )}
                </div>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.desc}
                </p>

                <div className="service-bottom">
                  <span>
                    Professional Support
                  </span>

                  <ArrowRight
                    size={17}
                  />
                </div>
              </motion.div>
            )
          )}
        </motion.div>
      </section>

      {/* =====================================================
          ACCOUNTING HIGHLIGHT
      ===================================================== */}

      <section className="accounting-highlight">
        <div className="accounting-glow" />

        <div className="accounting-container">
          <motion.div
            className="accounting-content"
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <div className="accounting-label">
              <Banknote size={17} />
              ACCOUNTING & FINANCE SUPPORT
            </div>

            <h2>
              Keep Your Financial
              <span>
                {" "}
                Operations Organized.
              </span>
            </h2>

            <p>
              Your business needs more than
              software. It also needs organized
              financial records, reconciliation and
              dependable accounting support.
            </p>

            <div className="accounting-checks">
              <div>
                <CheckCircle2 size={18} />
                Bookkeeping & transaction records
              </div>

              <div>
                <CheckCircle2 size={18} />
                Vendor reconciliation
              </div>

              <div>
                <CheckCircle2 size={18} />
                Creditor reconciliation
              </div>

              <div>
                <CheckCircle2 size={18} />
                GST reconciliation
              </div>

              <div>
                <CheckCircle2 size={18} />
                Bank reconciliation
              </div>

              <div>
                <CheckCircle2 size={18} />
                Accounts payable support
              </div>

              <div>
                <CheckCircle2 size={18} />
                MIS & financial reporting
              </div>

              <div>
                <CheckCircle2 size={18} />
                Balance sheet & audit support
              </div>
            </div>

            <button
              className="accounting-button"
              onClick={scrollToProject}
            >
              Discuss Your Accounting Needs
              <ArrowRight size={18} />
            </button>
          </motion.div>

          <motion.div
            className="accounting-dashboard"
            initial={{
              opacity: 0,
              x: 70,
              rotateY: -12,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              rotateY: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
          >
            <div className="dashboard-top">
              <div>
                <span>
                  Financial Overview
                </span>

                <strong>
                  Business Operations
                </strong>
              </div>

              <div className="dashboard-icon">
                <ChartNoAxesCombined
                  size={22}
                />
              </div>
            </div>

            <div className="dashboard-value">
              <small>
                Organized Financial Data
              </small>

              <strong>
                Accounting Support
              </strong>
            </div>

            <div className="dashboard-bars">
              <span
                style={{
                  height: "42%",
                }}
              />

              <span
                style={{
                  height: "66%",
                }}
              />

              <span
                style={{
                  height: "52%",
                }}
              />

              <span
                style={{
                  height: "78%",
                }}
              />

              <span
                style={{
                  height: "61%",
                }}
              />

              <span
                style={{
                  height: "88%",
                }}
              />

              <span
                style={{
                  height: "72%",
                }}
              />
            </div>

            <div className="dashboard-bottom">
              <div>
                <Calculator size={17} />
                <span>
                  Bookkeeping
                </span>
              </div>

              <div>
                <ReceiptIndianRupee
                  size={17}
                />
                <span>
                  Reconciliation
                </span>
              </div>

              <div>
                <FileSpreadsheet
                  size={17}
                />
                <span>
                  Reports
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY
      ===================================================== */}

      <section
        id="technologie"
        className="tech-section premium-section"
      >
        <motion.div
          className="tech-header"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <div className="section-tag">
            TECHNOLOGY STACK
          </div>

          <h1 className="tech-main-title">
            Built With Modern
            <span> Technology</span>
          </h1>

          <p className="tech-desc">
            Scalable, secure and high-performance
            technologies tailored to your business
            requirements.
          </p>
        </motion.div>

        <motion.div
          className="tech-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
        >
          {techStack.map(
            (tech, index) => (
              <motion.div
                key={index}
                className="tech-card"
                variants={fadeUp}
                whileHover={{
                  y: -10,
                  rotateX: 8,
                  rotateY: -6,
                  scale: 1.04,
                }}
              >
                <div className="tech-icon-wrapper">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                  />
                </div>

                <span>
                  {tech.name}
                </span>
              </motion.div>
            )
          )}
        </motion.div>
      </section>

      {/* =====================================================
          WHY KVCSPL
      ===================================================== */}

      <section
        id="about"
        className="achievements-section"
      >
        <div className="achievements-container">
          <motion.div
            className="achievements-left"
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <div className="section-tag">
              WHY KVCSPL
            </div>

            <h1 className="big-number">
              One
            </h1>

            <h2 className="achievements-title">
              Partner for
              <span>
                {" "}
                Multiple Business Needs.
              </span>
            </h2>

            <p className="achievements-desc">
              Technology, people operations,
              compliance and accounting support
              under one professional business
              ecosystem.
            </p>

            <div className="stats-bar">
              <div className="stat-item">
                <div className="stars">
                  {[...Array(5)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="currentColor"
                      />
                    )
                  )}
                </div>

                <span>
                  Client Focused
                </span>
              </div>

              <div className="divider" />

              <div className="stat-item">
                <Users size={18} />

                <span>
                  Business Support
                </span>
              </div>

              <div className="divider" />

              <div className="stat-item">
                <BadgeCheck
                  size={18}
                />

                <span>
                  Professional Approach
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="achievements-right"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >
            {features.map(
              (item, index) => (
                <motion.div
                  className="achievement-card"
                  key={index}
                  variants={fadeUp}
                  whileHover={{
                    y: -8,
                    rotateX: 3,
                    rotateY: -3,
                  }}
                >
                  <div className="achievement-icon">
                    {item.icon}
                  </div>

                  <h4>
                    {item.title}
                  </h4>

                  <p>
                    {item.desc}
                  </p>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="testimonial-section">
        <motion.div
          className="testimonial-header"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <div className="section-tag">
            CLIENT EXPERIENCE
          </div>

          <h2>
            Built Around
            <span>
              {" "}
              Long-Term Relationships.
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="testimonial-card"
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          <button
            className="arrow left"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          <div className="testimonial-content">
            <div className="stars">
              ★★★★★
            </div>

            <p className="testimonial-text">
              “
              {testimonials[current].text}
              ”
            </p>

            <div className="author">
              <img
                src={
                  testimonials[current]
                    .img
                }
                alt={
                  testimonials[current]
                    .name
                }
              />

              <div>
                <h4>
                  {
                    testimonials[current]
                      .name
                  }
                </h4>

                <small>
                  {
                    testimonials[current]
                      .role
                  }
                </small>
              </div>
            </div>
          </div>

          <button
            className="arrow right"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </motion.div>

        <div className="dots">
          {testimonials.map(
            (_, index) => (
              <span
                key={index}
                className={
                  current === index
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCurrent(index)
                }
              />
            )
          )}
        </div>
      </section>

      {/* =====================================================
          PROJECT / SERVICE REQUEST
      ===================================================== */}

      <section
        id="requestproject"
        className="pc-section"
      >
        <motion.div
          className="pc-left"
          initial={{
            opacity: 0,
            x: -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <div className="pc-icon">
            <Sparkles size={28} />
          </div>

          <div className="section-tag">
            LET'S WORK TOGETHER
          </div>

          <h2>
            Ready to Build
            Something Powerful?
          </h2>

          <p>
            Tell us what your organization
            needs. Whether it is software
            development, accounting support,
            reconciliation, HR, compliance or
            another business requirement, our
            team can help you identify the right
            approach.
          </p>

          <div className="pc-points">
            <span>
              <CheckCircle2 size={17} />
              No commitment required
            </span>

            <span>
              <CheckCircle2 size={17} />
              Confidential discussions
            </span>

            <span>
              <CheckCircle2 size={17} />
              Business-focused guidance
            </span>

            <span>
              <CheckCircle2 size={17} />
              Professional support
            </span>
          </div>

          <div className="pc-trust">
            <strong>
              KVCSPL — Technology &
              Business Solutions
            </strong>

            <small>
              Software • HR • Compliance •
              Accounting
            </small>
          </div>
        </motion.div>

        <motion.form
          className="pc-form"
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            x: 60,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <h3 className="pc-form-title">
            Tell Us About Your Requirement
          </h3>

          <p className="pc-form-sub">
            Fill out the form and our team
            will contact you to understand your
            requirements.
          </p>

          <div className="pc-grid">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              required
              value={formData.fullName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="company"
              placeholder="Company / Startup"
              value={formData.company}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <select
              name="projectType"
              required
              value={formData.projectType}
              onChange={handleChange}
            >
              <option value="">
                Select Service *
              </option>

              {/* Technology */}

              <option value="Web Application">
                Web Application
              </option>

              <option value="Mobile App">
                Mobile App
              </option>

              <option value="SaaS Platform">
                SaaS Platform
              </option>

              <option value="UI/UX Design">
                UI/UX Design
              </option>

              <option value="Cloud & DevOps">
                Cloud & DevOps
              </option>

              {/* HR */}

              <option value="HR & Compliance">
                HR & Compliance
              </option>

              <option value="Payroll Support">
                Payroll Support
              </option>

              <option value="Talent Acquisition">
                Talent Acquisition
              </option>

              {/* Accounting */}

              <option value="Accounting & Bookkeeping">
                Accounting & Bookkeeping
              </option>

              <option value="Vendor Reconciliation">
                Vendor Reconciliation
              </option>

              <option value="Creditor Reconciliation">
                Creditor Reconciliation
              </option>

              <option value="GST Reconciliation">
                GST Reconciliation
              </option>

              <option value="Accounts Payable Support">
                Accounts Payable Support
              </option>

              <option value="Bank Reconciliation">
                Bank Reconciliation
              </option>

              <option value="MIS & Financial Reporting">
                MIS & Financial Reporting
              </option>

              <option value="Balance Sheet & Tax Audit Support">
                Balance Sheet & Tax Audit Support
              </option>

              {/* Business */}

              <option value="Business Consultancy">
                Business Consultancy
              </option>

              <option value="Other">
                Other
              </option>
            </select>

            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            >
              <option value="">
                Budget / Service Range
              </option>

              <option value="Below ₹25,000">
                Below ₹25,000
              </option>

              <option value="₹25,000 – ₹50,000">
                ₹25,000 – ₹50,000
              </option>

              <option value="₹50,000 – ₹1,00,000">
                ₹50,000 – ₹1,00,000
              </option>

              <option value="₹1,00,000+">
                ₹1,00,000+
              </option>

              <option value="Need Consultation">
                Need Consultation
              </option>
            </select>
          </div>

          <select
            className="full"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
          >
            <option value="">
              Expected Timeline
            </option>

            <option value="Immediate">
              Immediate
            </option>

            <option value="Less than 1 month">
              Less than 1 month
            </option>

            <option value="1–3 months">
              1–3 months
            </option>

            <option value="3–6 months">
              3–6 months
            </option>

            <option value="Ongoing Support">
              Ongoing Support
            </option>
          </select>

          <textarea
            name="description"
            placeholder="Describe your requirements, accounting work, reconciliation requirements, GST work, HR support, software project or other business needs..."
            required
            value={formData.description}
            onChange={handleChange}
          />

          <div className="pc-footer">
            <span className="pc-note">
              <Shield size={15} />
              Your information is handled
              responsibly.
            </span>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Get Consultation"}

              <ArrowRight size={18} />
            </button>
          </div>
        </motion.form>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="faq-section">
        <motion.div
          className="faq-header"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <div className="section-tag">
            FAQ
          </div>

          <h2>
            Frequently Asked
            <span> Questions</span>
          </h2>

          <p>
            Everything you need to know about
            our technology, HR, compliance and
            accounting support services.
          </p>
        </motion.div>

        <div className="faq-container">
          {faqs.map(
            (faq, index) => (
              <motion.div
                key={index}
                className={`faq-item ${
                  activeIndex === index
                    ? "active"
                    : ""
                }`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
              >
                <div
                  className="faq-question"
                  onClick={() =>
                    toggleFAQ(index)
                  }
                >
                  <h4>
                    {faq.question}
                  </h4>

                  <span className="faq-icon">
                    {activeIndex === index
                      ? "−"
                      : "+"}
                  </span>
                </div>

                <div className="faq-answer">
                  <p>
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;