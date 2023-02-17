import React, { useState, useRef } from "react"
import { Close } from "../icons/icons"
import { Link } from "gatsby"
import { Image } from "./gatsby-images/image"
import data from "../data/products.json"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"

//transitions
const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] }
//variants
const titleSlideUp = {
  initial: { y: 200 },
  animate: { y: 0 },
}
const parent = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1,
    },
  },
}
const maskAnimation = {
  initial: { width: "100%" },
  animate: { width: 0 },
}

const Menu = ({ setMenuState, menuState, x, y, setCursorHovered }) => {
  return (
    <AnimatePresence>
      {menuState && (
        <>
          <motion.div
            initial={{ visibility: "hidden" }}
            animate={{ visibility: "visible", transition: { delay: 1 } }}
            exit={{ visibility: "hidden", transition: { delay: 1 } }}
            className="products"
          >
            <div className="menu-title">Products</div>
            <div
              className="close"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              onClick={() => setMenuState(false)}
            >
              <Close />
            </div>
            <div className="menu">
              <div className="container">
                <div className="menu-inner">
                  <motion.ul
                    animate="animate"
                    exit="exit"
                    initial="initial"
                    variants={parent}
                  >
                    {data.map((list, index) => (
                      <List
                        key={index}
                        x={x}
                        y={y}
                        list={list}
                        setCursorHovered={setCursorHovered}
                      />
                    ))}
                  </motion.ul>
                </div>
              </div>
            </div>
          </motion.div>
          <Panels />
        </>
      )}
    </AnimatePresence>
  )
}

const List = ({ list, x, y, setCursorHovered }) => {
  const list2 = useRef()
  const [hoverState, setHoverState] = useState(false)
  const [listPosition, setListPosition] = useState({ top: 0, left: 0 })
  useEffect(() => {
    setListPosition({
      top: list2.current.getBoundingClientRect().top,
      left: list2.current.getBoundingClientRect().left,
    })
  }, [hoverState])
  return (
    <li ref={list2}>
      <Link to={`/product/${list.id}`}>
        <div className="wrapper">
          <div className={`line left flex-${list.leftLineFlex}`}>
            <motion.div
              transition={{ ...transition, duration: 1 }}
              variants={maskAnimation}
              className="mask"
            ></motion.div>
          </div>
          <motion.div
            className="title"
            onHoverStart={() => setHoverState(true)}
            onHoverEnd={() => setHoverState(false)}
          >
            <h2>
              <motion.div
                variants={titleSlideUp}
                transition={transition}
                className="text"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                {list.title}
              </motion.div>
            </h2>
          </motion.div>
          <div className="thumbnail" style={{ left: list.thumbnailPosition }}>
            <Image src={list.src} />
            <motion.div
              transition={{ ...transition, duration: 1 }}
              variants={maskAnimation}
              className="mask"
            ></motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              x: x - listPosition.left + list.offset,
              y: y - listPosition.top,
              opacity: hoverState ? 1 : 0,
            }}
            transition={{ ease: "linear" }}
            className="floating-image"
          >
            <Image src={list.src} />
          </motion.div>
          <div className={`line right flex-${list.rightLineFlex}`}>
            <motion.div
              transition={{ ...transition, duration: 1 }}
              variants={maskAnimation}
              className="mask right"
            ></motion.div>
          </div>
        </div>
      </Link>
    </li>
  )
}
const Panels = () => {
  const [panelComplete, setPanelComplete] = useState(false)
  return (
    <>
      <motion.div
        style={{ background: panelComplete ? "#e7e7de" : "#e7dee7" }}
        initial={{ height: 0 }}
        animate={{ height: [0, window.innerHeight, 0], bottom: [null, 0, 0] }}
        exit={{ height: [0, window.innerHeight, 0], top: [null, 0, 0] }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
        className="left-panel-background"
      ></motion.div>
      <motion.div
        style={{ background: panelComplete ? "#e7e7de" : "#e7dee7" }}
        initial={{ height: 0 }}
        exit={{ height: [0, window.innerHeight, 0], bottom: [null, 0, 0] }}
        animate={{
          height: [0, window.innerHeight, 0],
          bottom: [0, 0, window.innerHeight],
        }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
        className="right-panel-background"
        onAnimationComplete={() => setPanelComplete(!panelComplete)}
      ></motion.div>
    </>
  )
}

export default Menu
