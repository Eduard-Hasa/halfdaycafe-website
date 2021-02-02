# Sections

If you have section-specific styles, it is better to put them in a `sections/` folder, in a file named after the section. For instance, it’s not uncommon to have very specific styles for the intro section hence the need for a `intro.sass` file in `sections/`.

*Note — Depending on your deployment process, these files could be called on their own to avoid merging them with the others in the resulting stylesheet. It is really up to you.*

Reference: [Sass Guidelines](http://sass-guidelin.es/) > [Architecture](http://sass-guidelin.es/#architecture) > [Pages folder](http://sass-guidelin.es/#pages-folder)