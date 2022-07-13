import Document, { CursorLocation, TextElement } from './Doc'

test('moves cursor when typing from blank', () => {
    const doc = new Document()
    const text = 'hello world'

    text.split('').forEach(char => doc.keyStroke(char))

    expect(doc.location).toEqual({ x: text.length, y: 0 })
    expect(doc.text).toEqual('hello world')

    expect(doc.lines).toHaveLength(2)
    expect(doc.lines[0]).toHaveLength(text.length)
    expect(doc.lines[1]).toEqual([])
})

test('moves cursor left', () => {
    const doc = new Document()
    const firstLine = 'hello'

    firstLine.split('').forEach((char) => doc.keyStroke(char))
    doc.cursorLeft()

    expect(doc.location).toEqual({ x: firstLine.length - 1, y: 0 })
    expect(doc.text).toEqual('hello')
})

test('deletes and moves cursor back left', () => {
    const doc = new Document()
    const firstLine = 'hello'

    firstLine.split('').forEach(char => doc.keyStroke(char))
    doc.backspace()

    expect(doc.location).toEqual({ x: firstLine.length - 1, y: 0 })
    expect(doc.text).toEqual('hell')
})

test('inserts and with moved cursor', () => {
    const doc = new Document()

    'hello'.split('').forEach((char) => doc.keyStroke(char))
    doc.location = {x:3, y:0}
    doc.keyStroke('x')

    expect(doc.text).toEqual('helxlo')
})


test('moves cursor with newline', () => {
    const doc = new Document()
    const firstLine = 'hello'
    const secondLine = 'world'

    firstLine.split('').forEach(char => doc.keyStroke(char))
    doc.newLine()
    secondLine.split('').forEach(char => doc.keyStroke(char))

    expect(doc.location).toEqual({ x: secondLine.length, y: 1 })

    expect(doc.text).toEqual('hello\nworld')

    expect(doc.lines).toHaveLength(3)
    expect(doc.lines[0]).toHaveLength(firstLine.length)
    expect(doc.lines[1]).toHaveLength(secondLine.length)
    expect(doc.lines[2]).toEqual([])
})

test('elementIndexAtLocation', () => {
    const doc = new Document()

    'hello'.split('').forEach(char => doc.keyStroke(char))
    doc.newLine()
    'world'.split('').forEach(char => doc.keyStroke(char))

    expect(doc.elementIndexAtLocation({ x: 0, y: 0})).toEqual(0)
    expect(doc.elementIndexAtLocation({ x: 6, y: 0})).toEqual(6)
    expect(doc.elementIndexAtLocation({ x: 0, y: 1})).toEqual(7)

    // Invalid location
    expect(() => doc.elementIndexAtLocation({ x: 7, y: 0})).toThrowError()
    expect(() => doc.elementIndexAtLocation({ x: 0, y: 2})).toThrowError()
    expect(() => doc.elementIndexAtLocation({ x: 7, y: 1})).toThrowError()
})

test('selects text and catches invalid selection', () => {
    const doc = new Document()
    const selection: [CursorLocation, CursorLocation] = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
    ]

    'hello'.split('').forEach((char) => doc.keyStroke(char))
    doc.select(selection)

    expect(doc.selection).toEqual(selection)


    // Invalid location
    expect(() =>
        doc.select([
            { x: 0, y: 0 },
            { x: 7, y: 0 },
        ])
    ).toThrowError()
    expect(() =>
        doc.select([
            { x: 0, y: 0 },
            { x: 0, y: 1 },
        ])
    ).toThrowError()
})

test('styles all characters in a selection', () => {
    const doc = new Document()
    const selection: [CursorLocation, CursorLocation] = [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
    ]

    'hello'.split('').forEach((char) => doc.keyStroke(char))
    doc.select(selection)
    doc.style('BOLD')

    expect((doc.document[0] as TextElement)?.style).toBe('BOLD')
    expect((doc.document[1] as TextElement)?.style).toBe('BOLD')
    expect((doc.document[2] as TextElement)?.style).toBe('BOLD')
})

test('moves selection back', () => {
    const doc = new Document()

    'hello'.split('').forEach((char) => doc.keyStroke(char))
    doc.location = {x: 2, y: 0}
    doc.backspace()

    expect(doc.location).toEqual({ x: 1, y:0})
    expect(doc.text).toBe('hllo')
    expect(doc.document.length).toBe(5)
})


test('deletes all characters in a selection', () => {
    const doc = new Document()
    const selection: [CursorLocation, CursorLocation] = [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
    ]

    'hello'.split('').forEach((char) => doc.keyStroke(char))
    doc.select(selection)
    doc.backspace()

    expect(doc.text).toBe('llo')
    expect(doc.document.length).toBe(4)
})

test('deletes selection over newline', () => {
    const doc = new Document()
    const selection: [CursorLocation, CursorLocation] = [
        { x: 4, y: 0 },
        { x: 2, y: 1 },
    ]

    // hell|o \n
    // w|orld

    'hello'.split('').forEach((char) => doc.keyStroke(char))
    doc.newLine()
    'world'.split('').forEach((char) => doc.keyStroke(char))

    doc.select(selection)
    doc.backspace()

    expect(doc.document.length).toBe(8)
})

test('adds EOF', () => {
    const doc = new Document()
    
    doc._setDocument([])
    doc.addEOF()

    expect(doc.document[0].type).toBe('eof')
})

test('adds EOF automatically', () => {
    const doc = new Document()

    'abd'.split('').forEach((char) => doc.keyStroke(char))
    doc.cursorLeft()
    doc.keyStroke('c')


    expect(doc.document[doc.document.length-1].type).toBe('eof')
})
