function normalizeDuration (value) {
    
        if (!value) return value;
        const onlyNums = value.replace(/[^\d]/g, "");
        return `${onlyNums.slice(0, 2)}:${onlyNums.slice(2, 4)}:${onlyNums.slice(
          4,
          6
        )
        }`
    }
        
        
export default normalizeDuration;