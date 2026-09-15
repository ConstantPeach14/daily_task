declare module 'lucide-react' {
  import * as React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type Icon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;
  export type LucideIcon = Icon;

  export const CheckCircle2: Icon;
  export const CheckCircle: Icon;
  export const Check: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const Bell: Icon;
  export const LayoutDashboard: Icon;
  export const ListTodo: Icon;
  export const CalendarDays: Icon;
  export const Calendar: Icon;
  export const AlertCircle: Icon;
  export const AlertTriangle: Icon;
  export const Sparkles: Icon;
  export const Plus: Icon;
  export const Clock: Icon;
  export const Layers: Icon;
  export const Search: Icon;
  export const SearchX: Icon;
  export const Pencil: Icon;
  export const Trash2: Icon;
  export const TrendingUp: Icon;
  export const Heart: Icon;
  export const Flag: Icon;

  const icons: Record<string, Icon>;
  export default icons;
}
