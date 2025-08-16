interface ReliabilityBadgeProps {
  grade: string
  size?: 'sm' | 'md' | 'lg'
}

const getReliabilityColor = (grade: string) => {
  switch (grade.toLowerCase()) {
    case 'thiqah':
    case 'reliable':
    case 'trustworthy':
      return 'text-green-700 bg-green-50 border-green-200'
    case 'saduq':
    case 'good':
      return 'text-blue-700 bg-blue-50 border-blue-200'
    case 'da\'if':
    case 'weak':
      return 'text-orange-700 bg-orange-50 border-orange-200'
    case 'matruk':
    case 'rejected':
      return 'text-red-700 bg-red-50 border-red-200'
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200'
  }
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base'
}

export default function ReliabilityBadge({ grade, size = 'md' }: ReliabilityBadgeProps) {
  return (
    <span className={`rounded-full font-semibold border transition-all duration-200 ${getReliabilityColor(grade)} ${sizeClasses[size]}`}>
      {grade}
    </span>
  )
}
