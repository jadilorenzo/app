type Style = 'bold' | 'italics' | 'underlined' | 'strikethrough' | 'custom' | 'none'

interface Paragraph {
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

    _getLocation() {
        const locationToParagraphIndex = [0]
        for (const paragraph of this.document) {
            paragraph.content.split('').forEach(() => {
                locationToParagraphIndex.push(this.document.indexOf(paragraph))
            })
        }
        this.paragraphIndex = locationToParagraphIndex[this.location]

        const previousParagraphs = this.document.splice(0, this.paragraphIndex)

        let previousParagraphCharacters = 0
        for (const paragraph of previousParagraphs) {
            previousParagraphCharacters =
            previousParagraphCharacters + paragraph.content.length
        }

        this.locationInParagraph = this.location - previousParagraphCharacters
    }

    cursorLeft(): this {
        this._getLocation()
        if (this.location !== 0) {
            this.location = this.location - 1
        }
        return this
    }

    cursorRight(): this {
        this._getLocation()
        if (this.location !== this.allText.length) {
            this.location = this.location + 1
        }
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
        this.location = this.location + 1
        this.selection = undefined

        return this
    }

    newLine(): this {
        this._getLocation()
        if (this.locationInParagraph <= this.document[this.paragraphIndex].content.length) {
            // set text of first paragraph to the first half of the original content
            this.document = insert(
                this.document,
                this.paragraphIndex - 1,
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
                    content: '',
                    style: 'none',
                    newLine: true
                }
            ) as Paragraph[]
        }

        return this
    }

    style(style: Style): this {
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
        
        return this
    }
    
    delete(): this {
        this._getLocation()
        if (this.selection) {
            this.document[this.paragraphIndex].content = removeRange(
                this.document[this.paragraphIndex].content.split(''),
                this.selection[0],
                this.selection[1]
            ).join('')
        } else {
            this.document[this.paragraphIndex].content = remove(
                this.document[this.paragraphIndex].content.split(''),
                this.locationInParagraph - 1
            ).join('')
        }
        this.allText = this.document.map((p) => p.content).join('')
        this.location = this.location - 1

        return this
    }
}

export default Document
// ✓✓✓✓✓✓✓✓✓✓✓✓✓