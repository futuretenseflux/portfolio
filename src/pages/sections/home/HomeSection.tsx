import { useState, useEffect, useCallback } from 'react';
import styles from '../../Home.module.css';

type CellType = {
  letter: string;
  isWordLetter: boolean;
  wordId?: string;
};

interface HomeSectionProps {
  scrollToSection: (section: string) => void;
}

const HomeSection = ({ scrollToSection }: HomeSectionProps) => {
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number>(0);
  const [wordIds, setWordIds] = useState<string[]>([]);
  const words = ['about', 'projects', 'research', 'github', 'journal'];

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
    
    const maxRow = direction === 'vertical' ? rows - word.length : rows - 1;
    const maxCol = direction === 'horizontal' ? cols - word.length : cols - 1;
    
    if (maxRow < 0 || maxCol < 0) return false;
    
    const startRow = Math.floor(Math.random() * (maxRow + 1));
    const startCol = Math.floor(Math.random() * (maxCol + 1));
    
    const wordPath: {row: number, col: number}[] = [];
    let hasCrossing = false;
    let isValidPlacement = true;
    
    for (let i = 0; i < word.length; i++) {
      const row = direction === 'vertical' ? startRow + i : startRow;
      const col = direction === 'horizontal' ? startCol + i : startCol;
      
      wordPath.push({row, col});
      
      const currentCell = grid[row][col];
      
      if (currentCell.isWordLetter) {
        if (currentCell.letter !== word[i]) {
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
        return !grid[r][c].isWordLetter;
      };
      
      if (direction === 'horizontal') {
        for (let i = 0; i < word.length; i++) {
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
          
          if (startCol + word.length < cols && !checkPerimeter(startRow, startCol + word.length)) {
            isValidPlacement = false;
          }
        }
      } else {
        for (let i = 0; i < word.length; i++) {
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
          
          if (startRow + word.length < rows && !checkPerimeter(startRow + word.length, startCol)) {
            isValidPlacement = false;
          }
        }
      }
    }
    
    if (isValidPlacement) {
      const wordId = `${word}-${direction}-${startRow}-${startCol}`;
      wordIds.push(wordId);
      
      for (let i = 0; i < word.length; i++) {
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

    const availableWidth = window.innerWidth - padding * 2;
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
    
    const newWordIds: string[] = [];
    
    for (const word of words) {
      let placed = false;
      for (let attempts = 0; attempts < 10 && !placed; attempts++) {
        const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        placed = placeWord(newGrid, word, direction, newWordIds);
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
    if (wordIds.length === 0) return;
    
    const timer = setInterval(() => {
      cycleHighlightedWord();
    }, 2000); // Change word every 2 seconds
    
    return () => clearInterval(timer);
  }, [wordIds, cycleHighlightedWord]);

  return (
    <div className={styles.crosswordContainer}>
      <div className={styles.crosswordGrid}>
        {grid.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.crosswordRow}>
            {row.map((cell, colIndex) => (
              <div 
                key={`cell-${rowIndex}-${colIndex}`} 
                className={`${styles.crosswordCell} ${cell.isWordLetter ? styles.wordLetter : styles.randomLetter} ${cell.wordId && (cell.wordId === hoveredWordId || (wordIds.length > 0 && cell.wordId === wordIds[highlightedWordIndex])) ? styles.hoveredWord : ''}`}
                onMouseEnter={() => {
                  if (cell.isWordLetter && cell.wordId) {
                    setHoveredWordId(cell.wordId);
                  }
                }}
                onMouseLeave={() => {
                  if (cell.isWordLetter && cell.wordId === hoveredWordId) {
                    setHoveredWordId(null);
                  }
                }}
                onClick={() => {
                  if (cell.isWordLetter) {
                    let wordFound = '';
                    
                    if (colIndex > 0 && grid[rowIndex][colIndex - 1].isWordLetter) {
                      let startCol = colIndex;
                      while (startCol > 0 && grid[rowIndex][startCol - 1].isWordLetter) {
                        startCol--;
                      }
                      
                      let word = '';
                      let checkCol = startCol;
                      while (checkCol < grid[rowIndex].length && grid[rowIndex][checkCol].isWordLetter) {
                        word += grid[rowIndex][checkCol].letter;
                        checkCol++;
                      }
                      
                      if (words.includes(word)) {
                        wordFound = word;
                      }
                    }
                    
                    if (!wordFound && rowIndex > 0 && grid[rowIndex - 1][colIndex].isWordLetter) {
                      let startRow = rowIndex;
                      while (startRow > 0 && grid[startRow - 1][colIndex].isWordLetter) {
                        startRow--;
                      }
                      
                      let word = '';
                      let checkRow = startRow;
                      while (checkRow < grid.length && grid[checkRow][colIndex].isWordLetter) {
                        word += grid[checkRow][colIndex].letter;
                        checkRow++;
                      }
                      
                      if (words.includes(word)) {
                        wordFound = word;
                      }
                    }
                    
                    if (wordFound) {
                      scrollToSection(wordFound);
                    }
                  }
                }}
              >
                {cell.letter}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSection;
