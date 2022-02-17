import Document from "./Document"

describe("Document", () => {
    test("exists", () => {
        const doc = new Document()
        expect(doc.allText).toBe('')
    })

    test("handles single keystroke", () => {
      const doc = new Document();
      expect(doc.keyStroke('a').allText).toBe('a')
    })

    test("handles several keystroke", () => {
      const doc = new Document();
      expect(doc.keyStroke("a").keyStroke("b").allText).toBe("ab")
    })

    test("handles moving cursor", () => {
      const doc = new Document();
      expect(
        doc.keyStroke("a").keyStroke("b").cursorLeft().cursorLeft().location
      ).toBe(0)
    })
})