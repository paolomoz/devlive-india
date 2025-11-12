import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create container with dark background
  const container = document.createElement('div');
  container.className = 'case-studies-container';

  // Convert block rows to case study cards
  const cards = document.createElement('div');
  cards.className = 'case-studies-cards';

  [...block.children].forEach((row, index) => {
    const card = document.createElement('div');
    card.className = 'case-studies-card';
    moveInstrumentation(row, card);

    // Get the text content from the first cell
    const textCell = row.querySelector('div');
    if (textCell) {
      const text = textCell.textContent.trim();

      // Create card content
      const cardContent = document.createElement('div');
      cardContent.className = 'case-studies-card-content';

      const description = document.createElement('p');
      description.className = 'case-studies-description';
      description.textContent = text;

      const link = document.createElement('a');
      link.className = 'case-studies-link';
      link.href = '#';
      link.textContent = 'Learn more';

      // Create arrow icon
      const arrow = document.createElement('span');
      arrow.className = 'case-studies-arrow';
      arrow.innerHTML = '→';
      link.appendChild(arrow);

      cardContent.appendChild(description);
      cardContent.appendChild(link);
      card.appendChild(cardContent);
    }

    cards.appendChild(card);

    // Add separator between cards (except after the last one)
    if (index < block.children.length - 1) {
      const separator = document.createElement('div');
      separator.className = 'case-studies-separator';
      cards.appendChild(separator);
    }
  });

  container.appendChild(cards);

  // Clear original content and add new structure
  block.textContent = '';
  block.appendChild(container);

  // Add smooth scroll reveal animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const allCards = block.querySelectorAll('.case-studies-card');
  allCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
}
