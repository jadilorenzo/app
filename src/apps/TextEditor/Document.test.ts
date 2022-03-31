import Document from './Document'

describe('Document', () => {
    test('exists', () => {
        const doc = new Document()
        expect(doc.allText).toBe('')
    })

    test('handles single keystroke', () => {
        const doc = new Document()
        const newDoc = doc.keyStroke('a')
        expect(newDoc.allText).toBe('a')
    })

    test('handles several keystrokes', () => {
        const doc = new Document()
        const newDoc = doc
            .keyStroke('a')
            .keyStroke('b')
        expect(
            newDoc.allText
        ).toBe('ab')
    })

    test('moves cursor', () => {
        const doc = new Document()
        const newDoc = doc
            .keyStroke('a')
            .keyStroke('b')
            .cursorLeft()
        expect(newDoc.location).toBe(1)
    })

    test('moves cursor in paragraphs', () => {
        const doc = new Document()
        expect(doc.keyStroke('a').keyStroke('b').cursorLeft().locationInParagraph).toBe(1)
    })

    test('inserts with moved cursor', () => {
        const doc = new Document()
        expect(
            doc
                .keyStroke('c') // c
                .cursorLeft()
                .keyStroke('b') // b|c
                .cursorLeft()
                .keyStroke('a') // a|b|c
                .cursorLeft().allText
        ).toBe('abc')
    })

    test('deletes single characters', () => {
        const doc = new Document()
        expect(
            doc
                .keyStroke('a')
                .delete().allText
        ).toBe('')
    })

    test('deletes many characters', () => {
        const doc = new Document()
        expect(
            doc.keyStroke('a').keyStroke('b').keyStroke('c').delete().allText
        ).toBe('ab')
    })

    test('deletes selection', () => {
        const doc = new Document()
        expect(
            doc
                .keyStroke('a')
                .keyStroke('b')
                .keyStroke('c')
                .keyStroke('d')
                .select(1, 2)
                .delete().allText
        ).toBe('ad')
    })

    test('creates new line', () => {
        const doc = new Document()
        const newDoc = doc.keyStroke('a').keyStroke('b').cursorLeft().newLine()
        expect(newDoc.document[0].content).toBe('a')
        expect(newDoc.document[1].newLine).toBe(true)
        expect(newDoc.document[2].content).toBe('b')
        expect(newDoc.document).toHaveLength(3)
    })

    test('moves between lines line', () => {
        const doc = new Document()
        let newDoc = doc.keyStroke('a')
        newDoc = newDoc.keyStroke('b')
        newDoc = newDoc.cursorLeft()
        newDoc = newDoc.newLine()
        newDoc = newDoc.cursorRight()
        newDoc = newDoc.cursorRight()
        expect(newDoc.paragraphIndex).toBe(2)
        expect(newDoc.document).toHaveLength(3)
        expect(newDoc.document[0].content).toBe('a')
        expect(newDoc.document[1].newLine).toBe(true)
        expect(newDoc.document[2].content).toBe('b')
        
    })

    test('has correct location in paragraph', () => {
        const doc = new Document()
        const newDoc = doc
            .keyStroke('a')
            .keyStroke('b')
            .keyStroke('c')
            .cursorLeft()
        expect(newDoc.locationInParagraph).toBe(newDoc.location)
    })

    test('carries style after new paragraph', () => {
        const doc = new Document()
        const newDoc = doc
            .keyStroke('a')
            .keyStroke('b')
            .style('bold')
            .cursorLeft()
            .newLine()

        expect(newDoc.document[0].style).toBe('bold')
        expect(newDoc.document[2].style).toBe('bold')
    })

    test('style splits paragraph', () => {
        const doc = new Document()
        const newDoc = doc
            .keyStroke('a')
            .keyStroke('b')
            .keyStroke('c')
            .keyStroke(' ')
            .keyStroke('e')
            .keyStroke('f')
            .keyStroke(' ')
            .keyStroke('h')
            .keyStroke('i')
            .cursorLeft()
            .cursorLeft()
            .cursorLeft()
            .cursorLeft()
            .style('bold')

        expect(newDoc.document).toHaveLength(3)
        expect(newDoc.document[2].style).toBe('none')
        expect(newDoc.document[1].content).toBe('ef')
        expect(newDoc.allText).toBe('abc ef hi')
        expect(newDoc.document[1].style).toBe('bold')
    })

    test('styles selection', () => {
        const doc = new Document()
        const newDoc = doc
            .keyStroke('a')
            .keyStroke('b')
            .keyStroke('c')
            .keyStroke(' ')
            .keyStroke('e')
            .keyStroke('f')
            .keyStroke(' ')
            .keyStroke('h')
            .keyStroke('i')
            .select(1,5)
            .style('bold')

        expect(newDoc.document).toHaveLength(3)
        expect(newDoc.document[2].style).toBe('none')
        expect(newDoc.document[1].content).toBe('bc e')
        expect(newDoc.allText).toBe('abc ef hi')
        expect(newDoc.document[1].style).toBe('bold')
    })

    test('replaces selection', () => {
        const doc = new Document()
        const newDoc = doc
            .keyStroke('a')
            .keyStroke('b')
            .keyStroke('c')
            .keyStroke(' ')
            .keyStroke('e')
            .keyStroke('f')
            .keyStroke(' ')
            .keyStroke('h')
            .keyStroke('i')
            .select(3, 3)
            .keyStroke('d')
            .select(6, 6)
            .keyStroke('g')

        expect(newDoc.allText).toBe('abcdefghi')
        expect(newDoc.selection).toBeUndefined()
    })

    test('applys styleCSS', () => {
        const doc = new Document()
        const newDoc = doc
            .keyStroke('a')
            .keyStroke('b')
            .keyStroke('c')
            .select(1,1)
            .style('custom', 'color: blue;')

        expect(newDoc.document[1].styleCSS).toBe('color: blue;')
    })

    test('applys large amounts of text and multiple spaces', () => {
        const doc = new Document()
        const sampleText = 'abcdefghijklmnopqrstuvwxyz  ...  ...'
        let newDoc = doc
        sampleText.split('').map((key) => {
            newDoc = newDoc.keyStroke(key)
        })

        expect(newDoc.allText).toBe(sampleText)
    })

    test('cursor back and forth between new line', () => {
        const doc = new Document()
        const sampleText = 'abcdefghijklmnopqrstuvwxyz  ...  ...'
        let newDoc = doc
        sampleText.split('').map((key) => {
            newDoc = newDoc.keyStroke(key)
        })
        newDoc.location = 10
        newDoc._getLocation()
        newDoc.newLine()
        for (let index = 0; index < 10; index++) {
            newDoc.cursorLeft()
        }
        for (let index = 0; index < 15; index++) {
            newDoc.cursorRight()
        }
        

        expect(newDoc.allText).toBe(sampleText)
    })
})