import { expect, test } from 'claude-code/testing'

import { topEdgeWidth } from './table-edge'

const mount = (text: string, surface: 'terminal' | 'desktop') => ({
  plugin: 'prismantis',
  surface,
  component: 'AssistantMessage' as const,
  props: { text, isFirstOfReply: true },
  viewport: { columns: 153, rows: 54 },
})

for (const surface of ['terminal', 'desktop'] as const) {
  test(`${surface} draws the borders and rules that depend on cell width in the monospaced face on desktop only`, { options: { tableStyle: 'box' } }, async $ => {
    const ui = await $.ui.mount(mount('| a | b |\n|---|---|\n| x | y |\n\n---\n\ntext after', surface))
    const lines = (await ui.findAll({ type: 'Text' })).filter(t => /^[┌├└╞]/.test(t.text) || /^─+$/.test(t.text))
    expect(lines.length).toBeGreaterThanOrEqual(4)
    for (const line of lines) {
      expect(line.props.mono === true).toBe(surface === 'desktop')
      expect(line.props.size).toBeUndefined()
    }
    expect((await ui.find({ type: 'Text', text: /text after/ }))?.props.mono).toBeUndefined()
    await ui.unmount()
  })
}

for (const [surface, room] of [['terminal', 149], ['desktop', 124]] as const) {
  test(`${surface} lays a wide table out to the room its cells really have`, { options: { tableStyle: 'box' } }, async $ => {
    const long = 'word '.repeat(60).trim()
    const ui = await $.ui.mount(mount(`| a | b |\n|---|---|\n| ${long} | ${long} |`, surface))
    expect(await topEdgeWidth(ui, 2)).toBe(room)
    await ui.unmount()
  })
}
