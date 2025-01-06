export const calculatePoints = (
    data: number[],
    width: number,
    height: number,
    padding: number = 20
  ): string => {
    const xStep = (width - padding * 2) / (data.length - 1);
    const max = Math.max(...data);
    const min = Math.min(...data);
    const yScale = (height - padding * 2) / (max - min);
  
    return data
      .map((value, index) => {
        const x = padding + index * xStep;
        const y = height - (padding + (value - min) * yScale);
        return `${x},${y}`;
      })
      .join(' ');
  };
  
  export const calculateBarWidth = (
    containerWidth: number,
    dataLength: number,
    padding: number = 20
  ): number => {
    return (containerWidth - padding * 2) / (dataLength * 2);
  };
  
  export const calculatePieSegments = (
    data: number[],
    radius: number,
    centerX: number,
    centerY: number
  ): { path: string; centroid: { x: number; y: number } }[] => {
    const total = data.reduce((sum, value) => sum + value, 0);
    let currentAngle = 0;
    
    return data.map(value => {
      const angle = (value / total) * 2 * Math.PI;
      const startX = centerX + Math.cos(currentAngle) * radius;
      const startY = centerY + Math.sin(currentAngle) * radius;
      const endX = centerX + Math.cos(currentAngle + angle) * radius;
      const endY = centerY + Math.sin(currentAngle + angle) * radius;
      
      const largeArcFlag = angle > Math.PI ? 1 : 0;
      
      const path = `
        M ${centerX} ${centerY}
        L ${startX} ${startY}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
        Z
      `;
      
      const centroidAngle = currentAngle + angle / 2;
      const centroidRadius = radius * 0.7;
      const centroid = {
        x: centerX + Math.cos(centroidAngle) * centroidRadius,
        y: centerY + Math.sin(centroidAngle) * centroidRadius,
      };
      
      currentAngle += angle;
      
      return { path, centroid };
    });
  };
  
  