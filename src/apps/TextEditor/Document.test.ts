import Document from './Document'

describe('Document', () => {
    test('exists', () => {
        const doc = new Document()
        expect(doc.allText).toBe('')
    })

    test('handles single keystroke', () => {
        const doc = new Document()
        expect(doc.keyStroke('a').allText).toBe('a')
    })

    test('handles several keystrokes', () => {
        const doc = new Document()
        expect(
            doc
                .keyStroke('a')
                .keyStroke('b').allText
        ).toBe('ab')
    })

    test('moves cursor', () => {
        const doc = new Document()
        expect(
            doc
                .keyStroke('a')
                .keyStroke('b')
                .cursorLeft().location
        ).toBe(1)
    })

    test('inserts with moved cursor', () => {
        const doc = new Document()
        expect(
            doc
                .keyStroke('c')
                .cursorLeft()
                .keyStroke('b')
                .cursorLeft()
                .keyStroke('a')
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
        expect(
            doc.keyStroke('a').keyStroke('b').newLine().document[1].newLine
        ).toBe(true)
    })
    
    test('creates new line in the middle of text', () => {
        const doc = new Document()
        expect(doc.keyStroke('a').keyStroke('b').cursorLeft().newLine().document).toHaveLength(3)
    })

    test('carries style after new paragraph', () => {
        const doc = new Document()
        expect(
            doc.keyStroke('a').style('bold').keyStroke('b').cursorLeft().newLine().document[2].style
        ).toBe('bold')
    })
})