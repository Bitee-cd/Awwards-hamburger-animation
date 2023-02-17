import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { motion } from "framer-motion"

//Components
import Header from "./header"
import Menu from "../components/menu"
//Styles
import "../styles/App.scss"
import useMousePosition from "../hooks/useMousePosition"

const Layout = ({ children }) => {
  const siteData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // State of our menu
  const [menuState, setMenuState] = useState(true)
  const [cursorHovered, setCursorHovered] = useState(true)
  //use Mouse Position
  const { x, y } = useMousePosition()
  return (
    <div className="app">
      <motion.div
        className="cursor"
        transition={{ ease: "linear", duration: 0.2 }}
        animate={{
          x: x - 26,
          y: y - 26,
          scale: cursorHovered ? 1.2 : 1,
          opacity: cursorHovered ? 0.8 : 0,
        }}
      ></motion.div>
      <Header
        siteTitle={siteData.site.siteMetadata.title}
        menuState={menuState}
        setMenuState={setMenuState}
        setCursorHovered={setCursorHovered}
      />
      <Menu
        x={x}
        y={y}
        setCursorHovered={setCursorHovered}
        menuState={menuState}
        setMenuState={setMenuState}
      />
      <div>
        <main>{children}</main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
