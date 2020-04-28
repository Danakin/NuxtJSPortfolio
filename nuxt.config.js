import path from 'path';
import glob from 'glob';
// import fs from 'fs';
// import Mode from 'frontmatter-markdown-loader/mode';

let files = glob.sync('**/*.md', { cwd: 'content' });

function getSlugs(post, _) {
  console.log(post + ' ' + _);
  let slug = post.substr(0, post.lastIndexOf('.'));
  return `/blog/${slug}`;
}

export default async () => {

  return {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
      title: process.env.npm_package_name || '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: process.env.npm_package_description || ''
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,700&family=Roboto+Slab:wght@400;700&display=swap'
        }
      ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: ['@/assets/scss/main.scss'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxt/typescript-build', '@nuxtjs/fontawesome'],
    /*
     ** Nuxt.js modules
     */
    modules: [],
    /*
     ** Build configuration
     */
    build: {
      /*
       ** You can extend webpack config here
       */
      extractCSS: true,
      extend(config, ctx) {
        config.module.rules.push({
          test: /\.md$/,
          include: path.resolve(__dirname, 'content'),
          loader: 'frontmatter-markdown-loader'
        });
      }
    },
    generate: {
      routes() {
        return files.map(getSlugs);
      }
    },
    fontawesome: {
      icons: {
        solid: [
          'faHome',
          'faAddressBook',
          'faBookOpen',
          'faLaptopHouse',
          'faUniversity',
          'faLaptopCode',
          'faWindowRestore',
          'faCamera',
          'faPen'
        ]
      }
    }
  }
}
