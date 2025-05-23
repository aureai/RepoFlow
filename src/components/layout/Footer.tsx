export function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/60 mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} RepoFlow. All rights reserved.</p>
        <p>Streamlining your path from local to live.</p>
      </div>
    </footer>
  );
}
