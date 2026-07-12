"use client";

import { usePathname } from "next/navigation";
import React from "react";
import styles from "./BlockedAccountAlert.module.css";

export const BlockedAccountAlert: React.FC = () => {
  const pathname = usePathname();

  // Ne pas afficher sur la page d'accueil
  if (pathname === "/") {
    return null;
  }

  return (
    <div className={styles.alertContainer}>
      <div className={styles.alertContent}>
        <div className={styles.iconWrapper}>
          <svg
            className={styles.icon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4v2m0 0v2m0-12a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
        </div>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Compte Bloqué</h2>
          <p className={styles.message}>
            {
              "⚠️ Votre compte est actuellement bloqué. Aucune transaction ne pourra être effectuée. Contactez immédiatement votre banque pour plus d'informations."
            }
          </p>
          <div className={styles.actionButtons}>
            <a href="tel:+390969399291" className={styles.phoneButton}>
              📞 Appeler la Banque
            </a>
            <a href="mailto:support@banque.com" className={styles.emailButton}>
              📧 Envoyer un Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
