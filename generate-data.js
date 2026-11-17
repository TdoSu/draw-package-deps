require('fs')
  .writeFileSync('./data.json',
    JSON.stringify(
    require('child_process')
      .execSync('pkg_info')
      .toString()
      .trim()
      .split('\n')
      .map(item => item.replace(/ .*/, ''))
      .map(p => {
        const r = require('child_process')
          .execSync(`pkg_info ${p}`)
          .toString()
          .split('\n\n')
          .filter(item => /Required by:/.test(item))

        const rp = r[0]?.trim().split('\n').slice(1) || []
        return {
          name: p,
          required: rp,
        }
      })
    )
  )



