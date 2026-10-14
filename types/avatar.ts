export interface AvatarProps {
  avatar?: string | null;
  name?: string;
  initials?: string;
  initialsBg?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
}