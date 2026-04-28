export default function Footer() {
  return (
    <footer className="border-t bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-primary mb-4">Kashdocs</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kashmir's most trusted doctor appointment platform. Connecting patients with the best specialists in the valley.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/doctors" className="hover:text-primary transition-colors">Find a Doctor</a></li>
              <li><a href="/dashboard" className="hover:text-primary transition-colors">My Appointments</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Srinagar, Jammu & Kashmir</li>
              <li>support@kashdocs.com</li>
              <li>+91 194 000 0000</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kashdocs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}