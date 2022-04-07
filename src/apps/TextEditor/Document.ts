type Style = 'bold' | 'italics' | 'underlined' | 'strikethrough' | 'custom' | 'none'

export interface Paragraph {
    type: 'text' | 'image'
    style?: Style
    styleCSS?: string
    content: string
    newLine?: boolean
}

type Selection = [number, number]

const insert = (arr: unknown[], index: number, newItem: unknown) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index),
]

const remove = (arr: unknown[], index: number) => [
    ...arr.slice(0, index),
    ...arr.slice(index+1),
]

const removeRange = (arr: unknown[], startIndex: number, endIndex: number) => [
    ...arr.slice(0, startIndex),
    ...arr.slice(endIndex + 1),
]

const getWordRangeFromIndex = (content: string, index: number) => {
    const contentWords = content.split(' ')
    let startIndex = 0
    let wordIndex = 0
    for (const word of contentWords) {
        if (startIndex + word.length + 1 <= index) {
            startIndex = startIndex + word.length + 1
            wordIndex = wordIndex + 1
        } else {
            break
        }
    }

    const endIndex = startIndex + contentWords[wordIndex].length

    return [startIndex, endIndex] as Selection
}

class Document {
    document: Paragraph[]
    location: number
    allText: string
    selection: Selection | undefined
    locationInParagraph: number
    paragraphIndex: number

    constructor() {
        this.document = [
            {
                type: 'text',
                style: 'none',
                content: '',
            },
        ]
        this.location = 0
        this.allText = this.document.map((p) => p.content).join('')
        this.selection = undefined
        this.paragraphIndex = 0
        this.locationInParagraph = 0
       
    }

    // _getLocation() {
    //     // const list : number[] = [] // list of lengths of paragrpahs
    //     // for (const p of this.document) {
    //     //     list.push(p.content.length)
    //     // }

    //     // let runningTotal = 0
    //     // let iterationCount = 0
    //     // list.forEach((n) => {
    //     //     if (runningTotal <= this.location && this.document.length !== 1) {
    //     //         runningTotal = runningTotal + n
    //     //         iterationCount = iterationCount + 1
    //     //     }
    //     // })
    //     // this.paragraphIndex = iterationCount === 0 ? 0 : iterationCount-1
    //     // this.locationInParagraph =
    //     //   Math.abs(this.location - runningTotal)
    //     let prevPargraphLengths = 0
    //     let parIndex = 0
    //     for (const paragraph of this.document) {
    //         prevPargraphLengths =
    //          prevPargraphLengths +
    //          (paragraph.content.length)
    //         parIndex = parIndex + 1
    //         if (prevPargraphLengths >= this.location) {
    //             prevPargraphLengths =
    //            prevPargraphLengths - paragraph.content.length
    //             parIndex = parIndex - 1
    //             this.locationInParagraph = this.location - prevPargraphLengths 
    //             this.paragraphIndex = parIndex
    //         }
    //     }
          
    //     // ******************************** ERROR *****************************
    //     // So you have a list of paragraphs
    //     // You also have which char you're at.
    //     // So to figure out what par index you're at you have to 
    //     // go through all prev paragraphs and add the length of their text to a list
    //     // go through each item in the list until your reach more than your char location
        
    // }

    _getLocation(): this {
        if (this.document.length === 1 || (this.paragraphIndex = 0)) {
            this.locationInParagraph = this.location
        } else if (
            this.location >= this.document[this.paragraphIndex]?.content.length
        ) {
            if (this.document[this.paragraphIndex + 1]?.newLine) {
                this.paragraphIndex = this.paragraphIndex + 2
            } else {
                this.paragraphIndex = this.paragraphIndex + 1
            }
            let index = 0
            let prevParagraphLengths = 0
            while (index !== this.paragraphIndex) {
                prevParagraphLengths =
              prevParagraphLengths + this.document[index]?.content.length
                // console.log(index, prevParagraphLengths, this.document[index].content, this.location-prevParagraphLengths)
                index = index + 1
            }
            const newLocationInParagraph = this.location - prevParagraphLengths
            if (newLocationInParagraph !== -1) {
                this.locationInParagraph = newLocationInParagraph
            } else {
                this.locationInParagraph = 0
            }
        } else if (
            this.location <= this.document[this.paragraphIndex]?.content.length
        ) {
            if (this.paragraphIndex !== 0) {
                this.paragraphIndex = this.paragraphIndex - 1
            }
            this.locationInParagraph = this.location
            // let index = 0
            // let prevParagraphLengths = 0
            // while (index !== this.paragraphIndex) {
            //     prevParagraphLengths =
            //   prevParagraphLengths + this.document[index]?.content.length
            //     // console.log(index, prevParagraphLengths, this.document[index].content, this.location-prevParagraphLengths)
            //     index = index + 1
            // }
            // const newLocationInParagraph = this.location - prevParagraphLengths
            // if (newLocationInParagraph !== -1)
            //     this.locationInParagraph = newLocationInParagraph
        }
        return this
    }

    cursorLeft(): this {
        this._getLocation()
        if (this.location !== 0) {
            this.location = this.location - 1
        }
        this._getLocation()
        return this
    }

    cursorRight(): this {
        this._getLocation()
        if (this.location !== this.allText.length) {
            this.location = this.location + 1
        }
        this._getLocation()
        return this
    }

    select(start: number, end: number): this {
        this.selection = [start, end]
        return this
    }

    keyStroke(key: string): this {
        this._getLocation()
        if (!this.selection) {
            this.document[this.paragraphIndex].content = insert(
                this.document[this.paragraphIndex].content.split(''),
                this.locationInParagraph,
                key
            ).join('')
        } else {
            const selection = this.selection
            this.delete()
            this.document[this.paragraphIndex].content = insert(
                this.document[this.paragraphIndex].content.split(''),
                selection[0],
                key
            ).join('')

        }
        this.allText = this.document.map((p) => p.content).join('')
        this.selection = undefined
        this.cursorRight()

        return this
    }

    newLine(): this {
        this._getLocation()
        if (this.locationInParagraph <= this.document[this.paragraphIndex].content.length) {
            // set text of first paragraph to the first half of the original content
            this.document = insert(
                this.document,
                this.paragraphIndex,
                {
                    ...this.document[this.paragraphIndex],
                    content: this.document[this.paragraphIndex].content.slice(0, this.locationInParagraph)
                }
            ) as Paragraph[]

            // set text of last paragraph to the last half of the original content
            this.document[this.paragraphIndex+1].content = this.document[this.paragraphIndex+1].content.slice(this.locationInParagraph)

            // add newline in between paragraphs
            this.document = insert(
                this.document, 
                this.paragraphIndex + 1, 
                {
                    type: 'text',
                    content: ' ',
                    style: 'none',
                    newLine: true
                }
            ) as Paragraph[]

            this.location = this.location + 1
            this.locationInParagraph = 0
            this._getLocation()
        }

        return this
    }

    style(style: Style, styleCSS?: string): this {
        this._getLocation()

        if ((this.locationInParagraph < this.document[this.paragraphIndex].content.length) || this.selection) {
            if (!this.selection) this.selection = getWordRangeFromIndex(this.document[this.paragraphIndex].content, this.locationInParagraph)
            const currentContent = this.document[this.paragraphIndex].content 

            // set text of first paragraph to the first section of the original content
            this.document = insert(this.document, this.paragraphIndex - 1, {
                ...this.document[this.paragraphIndex],
                content: currentContent.slice(
                    0,
                    this.selection[0]
                ),
            }) as Paragraph[]

            // set text of last paragraph to the last section of the original content
            this.document[this.paragraphIndex + 1].content =
              currentContent.slice(this.selection[1])

            // add newline in between paragraphs with middle section of text
            this.document = insert(this.document, this.paragraphIndex + 1, {
                ...this.document[this.paragraphIndex],
                style,
                ...(styleCSS ? {styleCSS: styleCSS}: {}),
                content: currentContent.slice(
                    this.selection[0],
                    this.selection[1]
                ),
            }) as Paragraph[]

            this.selection = undefined
            this.allText = this.document.map((p) => p.content).join('')
        } else {
            this.document[this.paragraphIndex].style = style
        }

        // this._getLocation()
    
        return this
    }
    
    delete(): this {
        this._getLocation()
        if (this.allText !== '') {
            if (this.selection) {
                this.document[this.paragraphIndex].content =
              removeRange(
                  this.document[this.paragraphIndex].content.split(''),
                  this.selection[0],
                  this.selection[1]
              ).join('') || ''
            } else {
                this.document[this.paragraphIndex].content =
              remove(
                  this.document[this.paragraphIndex].content.split(''),
                  this.locationInParagraph-1
              ).join('') || ''
            }
            this.allText = this.document.map((p) => p.content).join('')
            this.location = this.location - 1
            if (this.selection) {
                this.location = this.selection[0]
                this._getLocation()
                this.selection = undefined
            }
        }
        this._getLocation()
        return this
    }
}

export default Document
// ✓✓✓✓✓✓✓✓✓✓✓✓✓✓