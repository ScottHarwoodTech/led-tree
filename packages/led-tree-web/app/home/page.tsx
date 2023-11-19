'use client'

import React, { useState } from 'react';
import { InternalWorkspace } from './workspace'
import { Workspace } from 'blockly';
import { javascriptGenerator } from 'blockly/javascript'
import { pythonGenerator } from 'blockly/python'

import { Grid } from '@mui/material'
import { SupportedLanguage, SupportedStyle } from "./codeBlock"
import { CodeSection } from "./codeSection";
import { DisplaySection } from "./displaySection"


const BLOCKLY_XML = "blockly-xml";
const INITIAL_XML = "<xml xmlns=\"https://developers.google.com/blockly/xml\"></xml>";
const languageGenerator: Record<SupportedLanguage, typeof javascriptGenerator> = {
  javascript: javascriptGenerator,
  python: pythonGenerator
}

export default function Home() {
  const [code, setCode] = useState("")
  const [xml, setXml] = useState("")
  const [language, setLanguage] = useState<SupportedLanguage>("javascript")
  const [style, setStyle] = useState<SupportedStyle>("docco")
  const [jsCode, setJsCode] = useState("")
  const onWsChange = (ws: Workspace) => {
    const code = languageGenerator[language].workspaceToCode(ws)
    const jsCode = javascriptGenerator.workspaceToCode(ws)
    setCode(code)
    setJsCode(jsCode)
  }


  if (xml === "") {
    if (typeof window !== 'undefined' && window.localStorage) {
      const item = localStorage.getItem(BLOCKLY_XML)
      if (!item) {
        setXml(INITIAL_XML)
      } else {
        setXml(item)
      }
    }
  }

  const updateXML = (xml: string) => {
    localStorage.setItem(BLOCKLY_XML, xml)
    setXml(xml)
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <DisplaySection jsCode={jsCode} />
      </Grid>
      <Grid item xs={10}>
        <InternalWorkspace
          onWsChange={onWsChange}
          xml={xml}
          setXml={updateXML}
        />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={10} >
        <CodeSection
          code={code}
          setLanguage={setLanguage}
          setStyle={setStyle}
          style={style}
          language={language} />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}
