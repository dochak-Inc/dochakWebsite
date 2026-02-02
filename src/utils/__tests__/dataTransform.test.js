/**
 * Tests for data transformation utilities
 */

import {
  getLayoutType,
  validateContentStructure,
  transformTechnologiesData,
  createTechnologyData,
  getTotalSections,
  getSectionIndices
} from '../dataTransform';

// Mock data for testing
const mockTechnology = {
  title: 'Test Technology',
  subtitle: 'A test technology for validation',
  image: '/test-image.webp',
  features: [
    {
      title: 'How it works',
      desc: [
        'First working principle',
        'Second working principle',
        'Third working principle'
      ]
    },
    {
      title: 'What it can do',
      desc: [
        'First capability',
        'Second capability',
        'Third capability'
      ]
    },
    {
      title: 'Where it can be used',
      desc: [
        'First use case',
        'Second use case',
        'Third use case'
      ]
    }
  ]
};

const mockTechnologies = [mockTechnology];

describe('getLayoutType', () => {
  test('returns correct layout types', () => {
    expect(getLayoutType('How it works')).toBe('list');
    expect(getLayoutType('What it can do')).toBe('cards');
    expect(getLayoutType('Where it can be used')).toBe('grid');
    expect(getLayoutType('Unknown')).toBe('default');
  });
});

describe('validateContentStructure', () => {
  test('validates correct content structure', () => {
    const validContent = [
      {
        title: 'Test Tech',
        subtitle: 'Test subtitle',
        image: '/test.webp',
        sections: [
          { sectionTitle: 'Section 1', content: ['Content 1'] },
          { sectionTitle: 'Section 2', content: ['Content 2'] },
          { sectionTitle: 'Section 3', content: ['Content 3'] }
        ]
      }
    ];
    
    expect(validateContentStructure(validContent)).toBe(true);
  });

  test('rejects invalid content structure', () => {
    // Mock console.error to avoid test output noise
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    expect(validateContentStructure('not an array')).toBe(false);
    expect(validateContentStructure([{ title: 'Missing fields' }])).toBe(false);
    
    consoleSpy.mockRestore();
  });
});

describe('transformTechnologiesData', () => {
  test('transforms technologies data correctly', () => {
    const result = transformTechnologiesData(mockTechnologies);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('title', 'Test Technology');
    expect(result[0]).toHaveProperty('subtitle', 'A test technology for validation');
    expect(result[0]).toHaveProperty('image', '/test-image.webp');
    expect(result[0].sections).toHaveLength(3);
    
    // Check section structure
    expect(result[0].sections[0]).toEqual({
      sectionTitle: 'How it works',
      content: [
        'First working principle',
        'Second working principle',
        'Third working principle'
      ],
      layout: 'list'
    });
  });

  test('throws error for invalid input', () => {
    expect(() => transformTechnologiesData('not an array')).toThrow();
    expect(() => transformTechnologiesData([{ title: 'Incomplete' }])).toThrow();
  });
});

describe('createTechnologyData', () => {
  test('creates technology data with correct structure', () => {
    const result = createTechnologyData(
      'Test Tech',
      'Test subtitle',
      '/test.webp',
      mockTechnology.features
    );
    
    expect(result).toEqual({
      title: 'Test Tech',
      subtitle: 'Test subtitle',
      image: '/test.webp',
      sections: [
        {
          sectionTitle: 'How it works',
          content: [
            'First working principle',
            'Second working principle',
            'Third working principle'
          ],
          layout: 'list'
        },
        {
          sectionTitle: 'What it can do',
          content: [
            'First capability',
            'Second capability',
            'Third capability'
          ],
          layout: 'cards'
        },
        {
          sectionTitle: 'Where it can be used',
          content: [
            'First use case',
            'Second use case',
            'Third use case'
          ],
          layout: 'grid'
        }
      ]
    });
  });
});

describe('getTotalSections', () => {
  test('calculates total sections correctly', () => {
    const content = transformTechnologiesData(mockTechnologies);
    expect(getTotalSections(content)).toBe(3);
    
    const multipleContent = transformTechnologiesData([mockTechnology, mockTechnology]);
    expect(getTotalSections(multipleContent)).toBe(6);
  });
});

describe('getSectionIndices', () => {
  test('returns correct technology and section indices', () => {
    const content = transformTechnologiesData([mockTechnology, mockTechnology]);
    
    expect(getSectionIndices(0, content)).toEqual({ technologyIndex: 0, sectionIndex: 0 });
    expect(getSectionIndices(1, content)).toEqual({ technologyIndex: 0, sectionIndex: 1 });
    expect(getSectionIndices(2, content)).toEqual({ technologyIndex: 0, sectionIndex: 2 });
    expect(getSectionIndices(3, content)).toEqual({ technologyIndex: 1, sectionIndex: 0 });
    expect(getSectionIndices(4, content)).toEqual({ technologyIndex: 1, sectionIndex: 1 });
    expect(getSectionIndices(5, content)).toEqual({ technologyIndex: 1, sectionIndex: 2 });
  });

  test('handles out of bounds indices', () => {
    const content = transformTechnologiesData(mockTechnologies);
    const result = getSectionIndices(999, content);
    
    expect(result.technologyIndex).toBe(0);
    expect(result.sectionIndex).toBe(2);
  });
});