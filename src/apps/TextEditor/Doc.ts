import { v4 as uuidv4 } from 'uuid'

const exampleData = {
    x: 0,
    y: 0,
    activeTextStyle: 'none',
    activeBlockStyle: 'MATH',
    document: [
        {
            char: 'H',
            style: 'BOLD',
        },
        {
            char: 'e',
            style: 'UNDERLINE',
        },
        {
            char: 'l',
            style: 'STRIKETHROUH',
        },
        {
            char: 'l',
            style: 'ITALICS',
        },
        {
            char: 'o',
            style: 'none',
        },
        {
            char: '⇥',
            style: 'none',
        },
        {
            text: 'x^2',
            style: 'MATH',
            block: true,
        },
    ],
}

interface NewlineElement {
  type: 'newline';
  id: string;
}

export interface TextElement {
  type: 'text';
  char: string;
  style?: 'BOLD' | 'UNDERLINE' | 'STRIKETHROUH' | 'ITALICS' | string;
  id: string;
}

interface BlockElement {
  type: 'block';
  text: string;
  block: boolean;
  style?: 'MATH' | string;
  id: string;
}

interface EOFElement {
    type: 'eof'
    id: string
}

export type Element = NewlineElement | TextElement | BlockElement | EOFElement;

export interface CursorLocation {
  x: number;
  y: number;
}

const remove = (arr: unknown[], index: number) => [
    ...arr.slice(0, index),
    ...arr.slice(index + 1),
]

const insert = (arr: unknown[], index: number, element: unknown) => [
    ...arr.slice(0, index),
    element,
    ...arr.slice(index),
]

class Document {
    location: CursorLocation
    activeTextStyle:
    | 'BOLD'
    | 'UNDERLINE'
    | 'STRIKETHROUH'
    | 'ITALICS'
    | 'none'
    | string
    activeBlockStyle: 'MATH' | 'none' | string
    document: Element[]
    selection: [CursorLocation, CursorLocation] | undefined

    constructor() {
        this.location = { x: 0, y: 0 }
        this.activeTextStyle = 'none'
        this.activeBlockStyle = 'none'
        this.document = [{ type: 'eof', id: uuidv4() }]
        this.selection = undefined
    }

    get text(): string {
        return this.document
            .map((elem) => {
                switch (elem.type) {
                case 'block':
                    return elem.text
                case 'text':
                    return elem.char
                case 'newline':
                    return '\n'
                }
            })
            .join('')
    }

    get lines(): Element[][] {
        const lines: Element[][] = []
        let currentLine: Element[] = []

        for (const element of this.document) {
            if (element.type === 'newline') {
                lines.push(currentLine)
                currentLine = []
            } else {
                if (element.type !=='eof') currentLine.push(element)
            }
        }

        lines.push(currentLine)

        // Always end with empty new line
        if (currentLine.length > 0) {
            lines.push([])
        }

        return lines
    }

    _setDocument(document: Element[]) {
        this.document = document
    }

    addEOF() {
        // add eof 
        this._setDocument(
            insert(this.document, this.document.length, {
                type: 'eof',
                id: uuidv4(),
            }) as Element[]
        )
        return this
    }

    removeEOF() {
        // remove eof
        const eofIndex = this.document
            .map((element) => element.type === 'eof')
            .indexOf(true)

        this._setDocument(remove(this.document, eofIndex) as Element[])

        return this
    }

    keyStroke(key: string): this {
        if (key.split('').length !== 1) {
            throw new Error(`Single key expected. Received "${key}"`)
        }

        this.removeEOF()

        this._setDocument(
            insert(this.document, this.elementIndexAtLocation(this.location), {
                type: 'text',
                char: key,
                id: uuidv4(),
            }) as Element[]
        )
        this.cursorRight()

        this.addEOF()

        return this
    }

    _updateLocation(deltaX = 0): this {
        const lines = this.lines

        const { x, y } = this.location

        let newX = x,
            newY = y
        let deltaXLeft = Math.abs(deltaX)
        let lineRemainder

        if (deltaX > 0) {
            lineRemainder = lines[y].length - x
            while (deltaXLeft > 0) {
                if (deltaXLeft <= lineRemainder) {
                    newX += deltaXLeft
                    deltaXLeft = 0
                } else {
                    newX = 0
                    newY += 1
                    deltaXLeft -= lineRemainder + 1
                    lineRemainder = lines[newY].length
                }
            }
        } else if (deltaX < 0) {
            lineRemainder = x
            while (deltaXLeft > 0) {
                if (deltaXLeft <= x) {
                    newX -= deltaXLeft
                    deltaXLeft = 0
                } else {
                    newY -= 1
                    newX = lines[newY].length
                    deltaXLeft -= lineRemainder + 1
                    lineRemainder = lines[newY].length
                }
            }
        }

        // console.log('_updateLocation', { deltaX, x: newX, y: newY })
        this.location = { x: newX, y: newY }

        return this
    }

    cursorLeft(): this {
        this._updateLocation(-1)
        return this
    }

    cursorRight(): this {
        this._updateLocation(1)
        return this
    }

    newLine(): this {
        this._setDocument(
      insert(this.document, this.elementIndexAtLocation(this.location), {
          type: 'newline',
          id: uuidv4(),
      }) as Element[]
        )
        this.cursorRight()
        return this
    }

    elementIndexAtLocation(location: CursorLocation): number {
        let index = 0
        let x = 0,
            y = 0

        while (y < location.y) {
            if (this.document[index].type === 'newline') {
                y += 1
                index += 1
            }
            index += 1
        }

        while (x < location.x) {
            if (x > 0 && this.document[index - 1].type === 'newline') {
                throw new Error(`Invalid cursor location: ${JSON.stringify(location)}`)
            }

            x += 1
            index += 1
        }

        return index
    }

    select(selection: [CursorLocation, CursorLocation]): this {
        if (
            Math.abs(
                this.elementIndexAtLocation(selection[0]) -
          this.elementIndexAtLocation(selection[1])
            ) > this.document.length
        )
            throw new Error(`Invalid selection: ${JSON.stringify(selection)}`)

        this.selection = selection
        return this
    }

    backspace(): this {
        if (this.selection === undefined) {
            this.document = remove(
                this.document,
                this.elementIndexAtLocation(this.location) - 1
            ) as Element[]
            this.cursorLeft()
        } else {
            const selection = this.selection
            this.location = { ...selection[1], x: selection[1].x - selection[1].y } // calculate for the newline character
            this.selection = undefined
            while (
                this.location.x !== selection[0].x ||
        this.location.y !== selection[0].y
            ) {
                // console.log(this.text)
                // console.log(selection, this.location)
                this.backspace()
            }
            const documentSelection = this.document.slice(
                this.elementIndexAtLocation(selection[0]),
                this.elementIndexAtLocation(selection[1])
            )

            // remove new-lines in deleted selection
            if (
                documentSelection
                    .map((element) => element.type === 'newline')
                    .includes(true)
            ) {
                const newLineSelectionIndex = documentSelection
                    .map((element) => element.type === 'newline')
                    .indexOf(true)

                const newLineSelectionIndexId =
          documentSelection[newLineSelectionIndex].id

                const newLineIndex = this.document
                    .map((element) => element.id === newLineSelectionIndexId)
                    .indexOf(true)

                this.document = remove(this.document, newLineIndex) as Element[]
            }
        }
        return this
    }

    style(
        style: 'BOLD' | 'UNDERLINE' | 'STRIKETHROUH' | 'ITALICS' | string
    ): this {
        if (this.selection) {
            const startIndex = this.elementIndexAtLocation(this.selection[0])
            const endIndex = this.elementIndexAtLocation(this.selection[1])
            this.document = this.document.map((textElement, index) => {
                if (index >= startIndex && index <= endIndex) {
                    return { ...textElement, style }
                }
            }) as Element[]
        } else {
            throw new Error('No selection to style.')
        }
        return this
    }
}

export default Document
