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

    test('handles moving cursor', () => {
        const doc = new Document()
        expect(
            doc
                .keyStroke('a')
                .keyStroke('b')
                .cursorLeft().location
        ).toBe(1)
    })

    test('handles inserting with moved cursor', () => {
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

    test('handles deleting single character', () => {
        const doc = new Document()
        expect(
            doc
                .keyStroke('a')
                .delete().allText
        ).toBe('')
    })

    test('handles deleting many characters', () => {
        const doc = new Document()
        expect(
            doc.keyStroke('a').keyStroke('b').keyStroke('c').delete().allText
        ).toBe('ab')
    })

    test('handles deleting selection', () => {
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
})