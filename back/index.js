require(`babel-register`)({
  plugins: [
    `transform-es2015-modules-commonjs`,
    `transform-async-to-generator`,
    `transform-object-rest-spread`,
    `relay`,
  ],
})

require(`./${process.env.ENTRY}`)
