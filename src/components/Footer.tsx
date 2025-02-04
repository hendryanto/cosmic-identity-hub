import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Twitter, Youtube, MessageCircle, Music2 } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { name: "Cooking", href: "/products/cooking" },
        { name: "Cooling", href: "/products/cooling" },
        { name: "Cleaning", href: "/products/cleaning" },
        { name: "Small Appliances", href: "/products/small-appliances" },
        { name: "Professional Cooking", href: "/products/professional-cooking" },
        { name: "Professional Cooling", href: "/products/professional-cooling" },
        { name: "Energy", href: "/products/energy" },
        { name: "Professional Small", href: "/products/professional-small" },
        { name: "Smart Home Device", href: "/products/smart-home" },
      ],
    },
    program: {
      title: "Program",
      links: [
        { name: "Klaim Voucher Elektronik", href: "/program/voucher" },
        { name: "Trade In", href: "/program/trade-in" },
        { name: "Sewa", href: "/program/sewa" },
        { name: "Me by COSMOS", href: "/program/me" },
        { name: "Masterpiece", href: "/program/masterpiece" },
        { name: "Program Manfaat Karyawan", href: "/program/employee-benefits" },
      ],
    },
    info: {
      title: "Info Lebih Lanjut",
      links: [
        { name: "Hubungi Kami", href: "/support/contact" },
        { name: "FAQ", href: "/support/faq" },
        { name: "Temukan Toko", href: "/store-locator" },
        { name: "Promosi", href: "/promotions" },
      ],
    },
    playground: {
      title: "Lapangan Bermain Kami",
      links: [
        { name: "Beranda", href: "/" },
        { name: "Professional", href: "/professional" },
        { name: "Teknologi", href: "/technology" },
        { name: "Kesehatan", href: "/health" },
        { name: "Mobilitas", href: "/mobility" },
        { name: "Energi", href: "/energy" },
      ],
    },
    corporate: {
      title: "Korporasi",
      links: [
        { name: "Tentang Kami", href: "/about" },
        { name: "Pendirikan Kami", href: "/about/foundation" },
        { name: "Kolaborasi", href: "/collaboration" },
        { name: "Dalam COSMOS", href: "/in-cosmos" },
        { name: "COSMOS untuk Bisnis", href: "/business" },
        { name: "Kemitraan", href: "/partnership" },
        { name: "Karir", href: "/careers" },
      ],
    },
  };

  const additionalSections = [
    {
      title: "COSMOS Culinaria",
      links: [{ name: "Culinaria", href: "/culinaria" }],
    },
    {
      title: "Layanan",
      links: [
        { name: "Pusat Layanan", href: "/service-center" },
        { name: "Pendaftaran Garansi", href: "/warranty-registration" },
        { name: "Layanan Kontrak", href: "/contract-service" },
      ],
    },
    {
      title: "Artikel",
      links: [
        { name: "CSR", href: "/csr" },
        { name: "Berita", href: "/news" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Nilai - Nilai COSMOS",
      links: [
        { name: "Pengembangan SDM", href: "/hr-development" },
        { name: "Inklusi dan Keberagaman", href: "/diversity" },
        { name: "Manajemen Supply Chain", href: "/supply-chain" },
      ],
    },
    {
      title: "Etika dan Kepatuhan",
      links: [{ name: "Whistleblower", href: "/whistleblower" }],
    },
    {
      title: "COSMOS Design Solutions",
      links: [{ name: "Tentang Design Solutions", href: "/design-solutions" }],
    },
    {
      title: "Download",
      links: [
        { name: "Buku Panduan", href: "/guide-book" },
        { name: "Brosur", href: "/brochure" },
      ],
    },
  ];

  return (
    <footer className="bg-white pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="text-gray-600 hover:text-primary text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {additionalSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.href} className="text-gray-600 hover:text-primary text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-8 md:mb-0">
              <h3 className="font-semibold mb-4">Download Aplikasi Kami</h3>
              <div className="flex gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/lovable-uploads/67211670-08f8-4491-8217-e15cdf3d054b.png" alt="Get it on Google Play" className="h-10" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/lovable-uploads/74a679b8-bac4-49d8-a9cf-93b9f89e4b96.png" alt="Download on the App Store" className="h-10" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Kunjungi Media Sosial Kami</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Youtube className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <MessageCircle className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Music2 className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center pt-8 border-t">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img src="/lovable-uploads/7b1f6793-4b5e-47ba-858d-1c55aa05ac49.png" alt="Cosmos Logo" className="h-8" />
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <Link to="/privacy-policy" className="hover:text-primary">Kebijakan Privasi</Link>
              <Link to="/cookie-policy" className="hover:text-primary">Kebijakan Cookie</Link>
              <Link to="/terms" className="hover:text-primary">Syarat dan Ketentuan</Link>
              <Link to="/sitemap" className="hover:text-primary">Sitemap</Link>
              <Link to="/language" className="hover:text-primary">Indonesia</Link>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mt-8">
            Hak Cipta © 2025 COSMOS. Hak cipta dilindungi Undang-Undang.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;