import logoImage from 'assets/image/learningportal.svg';

export default function Navbar() {
  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <img className="h-10" src={logoImage} alt="logo" />
      </div>
    </nav>
  );
}
