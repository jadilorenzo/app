interface Paragraph {
    type: 'text' | 'image'
    style?: 'bold' | 'italics' | 'underlined' | 'strikethrough' | 'custom' | 'none' | undefined
    styleCSS?: string
    content: string
    newLine?: boolean
}

type Selection = [number, number]

const insert = (arr: unknown[], index: number, newItem: string) => [
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
        if (this.location !== 0) {
            this.location = this.location - 1
        }
        return this
    }

    cursorRight(): this {
        if (this.location !== this.allText.length) {
            this.location = this.location + 1
        }
        return this
    }

    select(start, end): this {
        this.selection = [start, end]
        return this
    }

    keyStroke(key: string): this {
        this._getLocation()
        this.document[this.paragraphIndex].content = insert(
            this.document[this.paragraphIndex].content.split(''),
            this.locationInParagraph,
            key
        ).join('')
        this.allText = this.document.map((p) => p.content).join('')
        this.location = this.location + 1

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
                this.locationInParagraph - 1 // no idea why -1 works
            ).join('')
        }
        this.allText = this.document.map((p) => p.content).join('')
        this.location = this.location - 1

        return this
    }
}

export default Document