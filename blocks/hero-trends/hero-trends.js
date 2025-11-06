export default function decorate(block) {
  // The block structure from authoring:
  // Row 1: Author byline
  // Row 2: Headline (multi-line)
  // Row 3: Description
  // Row 4: CTA text
  // Row 5: Button text and link
  // Row 6: Image

  const rows = [...block.children];

  // Create wrapper for content and image
  const wrapper = document.createElement('div');
  wrapper.className = 'hero-trends-wrapper';

  // Create content container
  const content = document.createElement('div');
  content.className = 'hero-trends-content';

  // Add author byline (row 0)
  if (rows[0]) {
    const author = rows[0].querySelector('div');
    if (author) {
      author.className = 'hero-trends-author';
      content.appendChild(author);
    }
  }

  // Add headline (row 1)
  if (rows[1]) {
    const headline = rows[1].querySelector('h1, h2, h3, p');
    if (headline) {
      if (!headline.matches('h1, h2, h3')) {
        const h1 = document.createElement('h1');
        h1.innerHTML = headline.innerHTML;
        headline.replaceWith(h1);
      }
      headline.className = 'hero-trends-headline';
      content.appendChild(headline);
    }
  }

  // Add description (row 2)
  if (rows[2]) {
    const description = rows[2].querySelector('p');
    if (description) {
      description.className = 'hero-trends-description';
      content.appendChild(description);
    }
  }

  // Add CTA text (row 3)
  if (rows[3]) {
    const ctaText = rows[3].querySelector('p');
    if (ctaText) {
      ctaText.className = 'hero-trends-cta-text';
      content.appendChild(ctaText);
    }
  }

  // Add button (row 4)
  if (rows[4]) {
    const button = rows[4].querySelector('a');
    if (button) {
      button.className = 'button hero-trends-button';
      content.appendChild(button);
    }
  }

  // Create image container (row 5)
  const imageContainer = document.createElement('div');
  imageContainer.className = 'hero-trends-image';

  if (rows[5]) {
    const picture = rows[5].querySelector('picture');
    if (picture) {
      imageContainer.appendChild(picture);
    }
  }

  // Assemble the block
  wrapper.appendChild(content);
  wrapper.appendChild(imageContainer);

  block.textContent = '';
  block.appendChild(wrapper);
}
