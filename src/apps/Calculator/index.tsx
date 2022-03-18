import React from 'react'
import nerdamer from 'nerdamer'
// Load additional modules. These are not required.
require('nerdamer/Algebra')
require('nerdamer/Calculus')
require('nerdamer/Solve')
require('nerdamer/Extra')


const Calculator = () => {
    const str = 'x+y'
    console.log(Function('x', 'y', `
        return (${str})
    `)(1, 3))
    console.log(nerdamer('x+3=2').solveFor('x').toString())
    return (
        <div>Hello World</div>
    )
}

export default Calculator