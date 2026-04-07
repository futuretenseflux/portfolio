import { useState, useEffect, useCallback } from 'react';
import styles from '../../Home.module.css';

type CellType = {
  letter: string;
  isWordLetter: boolean;
  isSymbol?: boolean;
  iconClass?: string;
  iconStyle?: 'solid' | 'brands';
  wordId?: string;
};

interface HomeSectionProps {
  scrollToSection: (section: string) => void;
}

const HomeSection = ({ scrollToSection }: HomeSectionProps) => {
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number>(0);
  const [wordIds, setWordIds] = useState<string[]>([]);
  const words = ['about', 'projects', 'research', 'github', 'journal'];

  const wordMarkerIcon: Record<string, { style: 'solid' | 'brands'; iconClass: string }> = {
    about: { style: 'solid', iconClass: 'fa-person-hiking' },
    projects: { style: 'solid', iconClass: 'fa-hammer' },
    research: { style: 'solid', iconClass: 'fa-flask' },
    github: { style: 'brands', iconClass: 'fa-github' },
    journal: { style: 'solid', iconClass: 'fa-book' }
  };

  const generateRandomLetter = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const placeWord = (
    grid: CellType[][],
    word: string,
    direction: 'horizontal' | 'vertical',
    wordIds: string[]
  ): boolean => {
    const rows = grid.length;
    if (rows === 0) return false;
    
    const cols = grid[0].length;
    if (cols === 0) return false;
    
    // We place all word letters => total cells = word.length
    const totalLen = word.length;
    const maxRow = direction === 'vertical' ? rows - totalLen : rows - 1;
    const maxCol = direction === 'horizontal' ? cols - totalLen : cols - 1;
    
    if (maxRow < 0 || maxCol < 0) return false;
    
    const startRow = Math.floor(Math.random() * (maxRow + 1));
    const startCol = Math.floor(Math.random() * (maxCol + 1));
    
    const wordPath: {row: number, col: number}[] = [];
    let hasCrossing = false;
    let isValidPlacement = true;
    
    for (let i = 0; i < totalLen; i++) {
      const row = direction === 'vertical' ? startRow + i : startRow;
      const col = direction === 'horizontal' ? startCol + i : startCol;
      
      wordPath.push({row, col});
      
      const currentRow = grid[row];
      if (!currentRow) {
        isValidPlacement = false;
        break;
      }

      const currentCell = currentRow[col];
      if (!currentCell) {
        isValidPlacement = false;
        break;
      }
      
      if (currentCell.isWordLetter || currentCell.isSymbol) {
        if (i === 0) {
          isValidPlacement = false;
          break;
        }

        if (currentCell.letter !== word[i - 1]) {
          isValidPlacement = false;
          break;
        } else {
          hasCrossing = true;
        }
      }
    }
    
    if (isValidPlacement && !hasCrossing) {
      const checkPerimeter = (r: number, c: number): boolean => {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return true;
        return !grid[r][c].isWordLetter && !grid[r][c].isSymbol;
      };
      
      if (direction === 'horizontal') {
        for (let i = 0; i < totalLen; i++) {
          const col = startCol + i;
          
          if (startRow > 0 && !checkPerimeter(startRow - 1, col)) {
            isValidPlacement = false;
            break;
          }
          
          if (startRow < rows - 1 && !checkPerimeter(startRow + 1, col)) {
            isValidPlacement = false;
            break;
          }
        }
        
        if (isValidPlacement) {
          if (startCol > 0 && !checkPerimeter(startRow, startCol - 1)) {
            isValidPlacement = false;
          }
          
          if (startCol + totalLen < cols && !checkPerimeter(startRow, startCol + totalLen)) {
            isValidPlacement = false;
          }
        }
      } else {
        for (let i = 0; i < totalLen; i++) {
          const row = startRow + i;
          
          if (startCol > 0 && !checkPerimeter(row, startCol - 1)) {
            isValidPlacement = false;
            break;
          }
          
          if (startCol < cols - 1 && !checkPerimeter(row, startCol + 1)) {
            isValidPlacement = false;
            break;
          }
        }
        
        if (isValidPlacement) {
          if (startRow > 0 && !checkPerimeter(startRow - 1, startCol)) {
            isValidPlacement = false;
          }
          
          if (startRow + totalLen < rows && !checkPerimeter(startRow + totalLen, startCol)) {
            isValidPlacement = false;
          }
        }
      }
    }
    
    if (isValidPlacement) {
      const wordId = `${word}-${direction}-${startRow}-${startCol}`;
      wordIds.push(wordId);

      for (let i = 0; i < totalLen; i++) {
        const row = direction === 'vertical' ? startRow + i : startRow;
        const col = direction === 'horizontal' ? startCol + i : startCol;
        
        grid[row][col] = {
          letter: word[i],
          isWordLetter: true,
          wordId: wordId
        };
      }
      return true;
    }
    
    return false;
  };

  const generateGrid = () => {
    const cellSize = 40;
    const padding = 20;

    const availableWidth = Math.min(window.innerWidth - padding * 2, 800);
    const availableHeight = window.innerHeight - padding * 2;
    
    const cols = Math.floor(availableWidth / cellSize);
    const rows = Math.floor(availableHeight / cellSize);
    
    const newGrid: CellType[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: CellType[] = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          letter: generateRandomLetter(),
          isWordLetter: false
        });
      }
      newGrid.push(row);
    }
    
    // Place symbols in last row, left side
    const lastRow = rows - 1;
    for (let i = 0; i < words.length && i < cols; i++) {
      const word = words[i];
      const marker = wordMarkerIcon[word];
      newGrid[lastRow][i] = {
        letter: '',
        isWordLetter: false,
        isSymbol: true,
        iconClass: marker.iconClass,
        iconStyle: marker.style
      };
    }
    
    // Place scroll down symbol in right corner of last row
    if (cols > words.length) {
      newGrid[lastRow][cols - 1] = {
        letter: '',
        isWordLetter: false,
        isSymbol: true,
        iconClass: 'fa-arrow-down',
        iconStyle: 'solid'
      };
    }
    
    const newWordIds: string[] = [];
    
    for (const word of words) {
      let placed = false;
      for (let attempts = 0; attempts < 10 && !placed; attempts++) {
        const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        placed = placeWord(newGrid, word, direction, newWordIds);
      }
    }
    
    // Associate symbols with their wordIds
    for (let i = 0; i < words.length && i < cols; i++) {
      const word = words[i];
      const wordId = newWordIds.find(id => id.startsWith(`${word}-`));
      if (wordId) {
        newGrid[lastRow][i].wordId = wordId;
      }
    }
    
    setGrid(newGrid);
    setWordIds(newWordIds);
    setHighlightedWordIndex(0);
  };

  const cycleHighlightedWord = useCallback(() => {
    if (wordIds.length > 0) {
      setHighlightedWordIndex((prevIndex) => (prevIndex + 1) % wordIds.length);
    }
  }, [wordIds]);

  useEffect(() => {
    generateGrid();
    
    const handleResize = () => {
      generateGrid();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (wordIds.length === 0 || isHovering) return;
    
    const timer = setInterval(() => {
      cycleHighlightedWord();
    }, 2000); // Change word every 2 seconds
    
    return () => clearInterval(timer);
  }, [wordIds, cycleHighlightedWord, isHovering]);

  return (
    <div className={styles.crosswordContainer}>
      <div className={styles.crosswordGrid}>
        {grid.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.crosswordRow}>
            {row.map((cell, colIndex) => (
              <div 
                key={`cell-${rowIndex}-${colIndex}`} 
                className={`${styles.crosswordCell} ${cell.isWordLetter ? styles.wordLetter : styles.randomLetter} ${cell.wordId && cell.wordId === hoveredWordId ? styles.hoveredWord : ''} ${cell.wordId && wordIds.length > 0 && cell.wordId === wordIds[highlightedWordIndex] && !isHovering ? styles.cycledWord : ''}`}
                onMouseEnter={() => {
                  if ((cell.isWordLetter || cell.isSymbol) && cell.wordId) {
                    setHoveredWordId(cell.wordId);
                    setIsHovering(true);
                  }
                }}
                onMouseLeave={() => {
                  if ((cell.isWordLetter || cell.isSymbol) && cell.wordId === hoveredWordId) {
                    setHoveredWordId(null);
                    setIsHovering(false);
                  }
                }}
                onClick={() => {
                  if (cell.isWordLetter) {
                    let wordFound = '';

                    {
                      let startCol = colIndex;
                      while (startCol > 0 && grid[rowIndex][startCol - 1].isWordLetter) {
                        startCol--;
                      }

                      let word = '';
                      let checkCol = startCol;
                      while (checkCol < grid[rowIndex].length && grid[rowIndex][checkCol].isWordLetter) {
                        const c = grid[rowIndex][checkCol];
                        if (!c.isSymbol) word += c.letter;
                        checkCol++;
                      }

                      if (words.includes(word)) {
                        wordFound = word;
                      }
                    }

                    if (!wordFound) {
                      let startRow = rowIndex;
                      while (startRow > 0 && grid[startRow - 1][colIndex].isWordLetter) {
                        startRow--;
                      }

                      let word = '';
                      let checkRow = startRow;
                      while (checkRow < grid.length && grid[checkRow][colIndex].isWordLetter) {
                        const c = grid[checkRow][colIndex];
                        if (!c.isSymbol) word += c.letter;
                        checkRow++;
                      }

                      if (words.includes(word)) {
                        wordFound = word;
                      }
                    }
                    
                    if (wordFound) {
                      scrollToSection(wordFound);
                    }
                  } else if (cell.isSymbol && colIndex === grid[rowIndex].length - 1 && rowIndex === grid.length - 1) {
                    // Scroll down symbol clicked
                    scrollToSection('about');
                  }
                }}
              >
                {cell.isSymbol && cell.iconClass ? (
                  <i
                    className={`${cell.iconStyle === 'brands' ? 'fa-brands' : 'fa-solid'} ${cell.iconClass} ${styles.symbolIcon}`}
                    aria-hidden="true"
                  />
                ) : (
                  cell.letter
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSection;
