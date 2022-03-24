import React from 'react'
import TextEditor from './TextEditor'
import Calculator from './Calculator'

const Apps: {
  [key: string]: React.FC;
} = {
    TE: TextEditor,
    Calculator
}

export default Apps