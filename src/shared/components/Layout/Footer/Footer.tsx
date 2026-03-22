const version = __APP_VERSION__

function Footer() {
  return (
    <footer className="border-top mt-auto py-3 text-center text-muted">
      <small>
        &copy; 2026{' '}
        <a
          href="https://github.com/phmilk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted"
        >
          phmilk
        </a>{' '}
        &mdash;{' '}
        <a
          href="https://github.com/phmilk/github-repo-explorer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted"
        >
          GitHub Repo Explorer
        </a>{' '}
        v{version}
      </small>
    </footer>
  )
}

export default Footer
