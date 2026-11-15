"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Rendered instead of the children once they have thrown. */
  fallback: ReactNode;
}

/**
 * Contains failures of optional, decorative widgets (e.g. the WebGL globe on a
 * device without GPU access) so they can never take the whole page down.
 */
export default class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
