import fileRoutes from "vinxi/routes";

type LinkProps = {
  children: preact.ComponentChildren;
  to: string;
}

const Link = ({ children, to }: LinkProps) => {
  const handleClick = () => {
    console.log('to', to, fileRoutes)
  }
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
)}

export default Link;
