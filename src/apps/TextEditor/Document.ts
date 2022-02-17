interface Paragraph {
    type: 'text' | 'image'
    style?: 'bold' | 'italics' | 'underlined' | 'strikethrough' | 'custom' | 'none' | undefined
    content: string
    newLine?: boolean
}

const insert = (arr: any[], index: number, newItem: string) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];


class Document {
    document: Paragraph[];
    location: number;
    allText: string;

    constructor() {
        this.document = [
            {
                type: "text",
                style: "none",
                content: "",
            },
        ];
        this.location = 0
        this.allText = this.document.map((p) => p.content).join("")
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

    keyStroke(key: string): this {
        const locationToParagraphIndex : number[] = [0]
        for (const paragraph of this.document) {
            paragraph.content.split('').forEach(() => {
               locationToParagraphIndex.push(this.document.indexOf(paragraph))
            })
        }

        // for every previous paragraph add charcters and then subtract from total location
        const previousParagraphs = this.document.splice(
          0,
          locationToParagraphIndex[this.location]
        )

        let previousParagraphCharacters = 0
        for (const paragraph of previousParagraphs) {
            previousParagraphCharacters = previousParagraphCharacters + paragraph.content.length
        }

        this.document[locationToParagraphIndex[this.location]].content = 
            insert(
                this.document[locationToParagraphIndex[this.location]].content.split(""),
                this.location-previousParagraphCharacters,
                key
            ).join("")
        this.allText = this.document.map((p) => p.content).join("")
        this.location = this.location + 1

        return this
    }
}

export default Document