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

    setLocation({location, incompleteLocation}: {
        location?: number
        incompleteLocation?: {
            locationInParagraph: number
            paragraphIndex: number
        }
    }): this {
        if (location !== undefined) {



            // if (isAtEndOfLine) {
            //      this.paragraphIndex = this.paragraphIndex + 1
            //      this.locationInParagraph = 0 
            // }

            // if (paragraphIndex = 0) {
            //      this.location = location
            //      this.locationInParagraph = location
            // }




            // // update
            // // -> location
            // this.location = location

            // // update
            // //  -> paragraphIndex
            // //  -> locationInParagraph

            // // location - prevParagraphLengths (should) = locationInParagraph

            // // get prevParagraphLengths
            // let prevParagraphLengths = 0
            // const updatePrevParagraphLengths = () => {
            //     let _index = 0
            //     for (const paragraph of this.document) {
            //         if (_index < this.paragraphIndex && !paragraph.newLine) {
            //             prevParagraphLengths =
            //       prevParagraphLengths + paragraph.content.length
            //         }
            //         _index = _index + 1
            //     }
            // }
            // updatePrevParagraphLengths()

            // // update paragraphIndex first
            // //      if location - prevParagraphLengths (supposed locationInParagraph) > length of current paragraph
            // //          add to paragraphIndex // skip newlines obviously
            // //          update prevParagraphLengths
            // // ------------------------- SKIPPED ------------------------------------------
            // //      else if location - prevParagraph <= length of current paragraph
            // //          sutract one from paragraphIndex // skip newlines
            // //          update prevParagraphLengths
            // // ----------------------------------------------------------------------------
            // // // if ((this.location - prevParagraphLengths) > this.document[this.paragraphIndex].content.length) {
            // // //     //  for every paragraph if its index is less than or equal to the current index and is a new line
            // // //     //      add a new line

            // // //     for (let index = 0; index < this.document.length; index++) {
            // // //         if (index > this.paragraphIndex) {
            // // //             this.paragraphIndex = this.paragraphIndex + 1
            // // //     }
            // // //     }
            // // //     updatePrevParagraphLengths()
            // // // }  else
            // if (
            //     this.location - prevParagraphLengths + 1 === 
            //     this.document[this.paragraphIndex].content.length
            //     &&
            //     this.document[this.paragraphIndex+1]
            // ) {
            //     if (this.document[this.paragraphIndex + 1]?.newLine){
            //         this.setLocation({
            //             incompleteLocation: { 
            //                 paragraphIndex: this.paragraphIndex + 2, 
            //                 locationInParagraph: 0 
            //             },
            //         })
            //     } else {
            //         this.setLocation({
            //             incompleteLocation: {
            //                 paragraphIndex: this.paragraphIndex + 1,
            //                 locationInParagraph: 0
            //             },
            //         }) 
            //     }
            //     updatePrevParagraphLengths()
            // }
            // ************************************
            // else {
            //     for (let index = 0; index < this.document.length; index++) {
            //         if (
            //             index >= this.paragraphIndex &&
            //        this.document[index].newLine
            //         ) {
            //             this.paragraphIndex = this.paragraphIndex - 1
            //         }
            //     }
            //     updatePrevParagraphLengths()
            // }

            // set locationInParagraph
            // this.locationInParagraph = this.location - prevParagraphLengths
            // this.document.map((p) => p.content).join('')
        } else if (incompleteLocation !== undefined) {
            let docLocation = 0
            let par = 0
            for (const paragraph of this.document) {
                if (incompleteLocation.paragraphIndex === 0) {
                    docLocation = incompleteLocation.locationInParagraph
                } else {
                    if (incompleteLocation.paragraphIndex > par) {
                        docLocation = docLocation + paragraph.content.length
                        if (incompleteLocation.paragraphIndex === par + 1) {
                            docLocation =
                        docLocation + incompleteLocation.locationInParagraph
                        }
                    }
                }
                par = par + 1
            }
            this.setLocation({location: docLocation})
            console.log({incompleteLocation}, {docLocation})
        }
        this.allText = this.document.map((p) => p.content).join('')
        console.log({
            location: this.location,
            locationInParagraph: this.locationInParagraph,
        })


        return this
    }

    _getGlobalLocation(parIndex: number, index: number) {
        let docLocation = 0
        let par = 0
        for (const paragraph of this.document) {
            if (parIndex === 0) {
                docLocation = index
            } else {
                if (parIndex > par) {
                    docLocation = docLocation + paragraph.content.length
                    if (parIndex === par + 1) {
                        docLocation = docLocation + index
                    }
                }
            }
            par = par + 1
        }
        return docLocation
    }

    cursorLeft(): this {
        if (this.location !== 0) {
            this.setLocation({location: this.location - 1})
        }
        return this
    }

    cursorRight(): this {
        if (this.location !== this.allText.length + 1) {
            this.setLocation({location: this.location + 1})
        }
        return this
    }

    select(start: number, end: number): this {
        this.selection = [start, end].sort((a, b) => a-b) as Selection
        return this
    }

    keyStroke(key: string): this {
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
        if (
            this.locationInParagraph <=
      this.document[this.paragraphIndex].content.length
        ) {
            // set text of first paragraph to the first half of the original content
            this.document = insert(this.document, this.paragraphIndex, {
                ...this.document[this.paragraphIndex],
                content: this.document[this.paragraphIndex].content.slice(
                    0,
                    this.locationInParagraph
                ),
            }) as Paragraph[]

            // set text of last paragraph to the last half of the original content
            this.document[this.paragraphIndex + 1].content = this.document[
                this.paragraphIndex + 1
            ].content.slice(this.locationInParagraph)

            // add newline in between paragraphs
            this.document = insert(this.document, this.paragraphIndex + 1, {
                type: 'text',
                content: '⇥',
                style: 'none',
                newLine: true,
            }) as Paragraph[]

            this.setLocation({incompleteLocation: {paragraphIndex: this.paragraphIndex+2, locationInParagraph: 0}})
        }

        return this
    }

    style(style: Style, styleCSS?: string): this {
        if (
            this.locationInParagraph <
        this.document[this.paragraphIndex].content.length ||
      this.selection
        ) {
            if (!this.selection)
                this.selection = getWordRangeFromIndex(
                    this.document[this.paragraphIndex].content,
                    this.locationInParagraph
                )
            const currentContent = this.document[this.paragraphIndex].content

            // set text of first paragraph to the first section of the original content
            this.document = insert(this.document, this.paragraphIndex - 1, {
                ...this.document[this.paragraphIndex],
                content: currentContent.slice(0, this.selection[0]),
            }) as Paragraph[]

            // set text of last paragraph to the last section of the original content
            this.document[this.paragraphIndex + 1].content = currentContent.slice(
                this.selection[1]
            )

            // add newline in between paragraphs with middle section of text
            this.document = insert(this.document, this.paragraphIndex + 1, {
                ...this.document[this.paragraphIndex],
                style,
                ...(styleCSS ? { styleCSS: styleCSS } : {}),
                content: currentContent.slice(this.selection[0], this.selection[1]),
            }) as Paragraph[]

            this.selection = undefined
            this.allText = this.document.map((p) => p.content).join('')
        } else {
            this.document[this.paragraphIndex].style = style
        }

        return this
    }

    delete(): this {

        // if not selection
        //      if location is not 0
        //          delete at position
        //      else 
        //          delete newLine
        //          and merge
        //      and move cursor back
        // if selection
        //      start at end of selection
        //      while position !== seleciton start
        //          call yourself

        if (!this.selection) {
            if (this.locationInParagraph !== 0 && this.location !== 0) {
                // delete at position
                this.document[this.paragraphIndex].content =
                    remove(
                        this.document[this.paragraphIndex].content.split(''),
                        this.locationInParagraph-1
                    ).join('') 
            } else {
                if (this.document[this.paragraphIndex - 1].newLine) {
                    // merge
                    this.document[this.paragraphIndex - 2].content =
                      this.document[this.paragraphIndex - 2].content +
                      this.document[this.paragraphIndex].content

                    //   delete newLine
                    this.document = remove(
                        this.document,
                        this.paragraphIndex - 1
                    ) as Paragraph[]
                }    
            }
            this.setLocation({location: this.location - 1})
        } else {
            const selection = this.selection
            this.selection = undefined
            this.setLocation({location: selection[1]+1})
            for (
                let index = 0;
                index <= selection[1] - selection[0];
                index++
            ) {
                this.delete()
            }
        }

        // if (this.allText !== '') {
        //     if (this.selection) {
        //         this.document[this.paragraphIndex].content =
        //   removeRange(
        //       this.document[this.paragraphIndex].content.split(''),
        //       this.selection[0],
        //       this.selection[1]
        //   ).join('') || ''
        //     } else if (this.locationInParagraph === 0) {
        //         this.document[this.paragraphIndex - 2].content =
        //   this.document[this.paragraphIndex - 2].content +
        //   this.document[this.paragraphIndex].content

        //         this.document = remove(
        //             this.document,
        //             this.paragraphIndex - 1
        //         ) as Paragraph[]

        //         this.document = remove(
        //             this.document,
        //             this.paragraphIndex
        //         ) as Paragraph[]

        //         this.document = remove(
        //             this.document,
        //             this.paragraphIndex - 1
        //         ) as Paragraph[]

        //         this.paragraphIndex = this.paragraphIndex - 2
        //     } else {
        //         this.document[this.paragraphIndex].content =
        //             remove(
        //                 this.document[this.paragraphIndex].content.split(''),
        //                 this.locationInParagraph - 1
        //             ).join('') || ''
        //     }
        //     this.setLocation({location: this.location - 1})
        //     if (this.selection) {
        //         this.setLocation({location: this.selection[0]})
        //         this.selection = undefined
        //     }
        // }
        return this
    }
}

export default Document
// ✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓