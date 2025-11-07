export function Footer() {
  return (
    <div>
      <img className="w-full" src="src/assets/Footer.png" alt="" />
      <footer className="bg-[#334156] text-white text-left flex justify-center gap-5 py-5">
        <ul>
          <h3>Company</h3>
          <p>Bazaar Nord Emv</p>
          <p>CVR-NB-44215799</p>
        </ul>
        <ul>
          <h3>Address</h3>
          <p>Bakkegårdsvej 28 C,2</p>
          <p>9000 Aalborg</p>
        </ul>
        <ul>
          <h3>Policy</h3>
          <li>
            <a href="">Terms and Conditions</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Withdrawal</a>
          </li>
          <li>
            <a href="#">Cookies</a>
          </li>
        </ul>
        <ul>
          <h3>Contact Info</h3>
          <p>Phone: +45 42506072</p>
          <p>E-mail: sgtprepper@nord.dk</p>
        </ul>
      </footer>
    </div>
  );
}
