
import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import { Accounting } from '@/pages/Accounting';
import { Contacts } from '@/pages/Contacts';
import Quotes from '@/pages/Quotes';
import { Invoicing } from '@/pages/Invoicing';
import { Purchases } from '@/pages/Purchases';
import { Products } from '@/pages/Products';
import { Stock } from '@/pages/Stock';
import { Treasury } from '@/pages/Treasury';
import Budget from '@/pages/Budget';
import Employees from '@/pages/Employees';
import { Reports } from '@/pages/Reports';
import { Analytics } from '@/pages/Analytics';
import TrainingSupport from '@/pages/TrainingSupport';
import JournalComptablePage from '@/pages/JournalComptable';
import GrandLivrePage from '@/pages/GrandLivre';
import BalanceGeneralePage from '@/pages/BalanceGenerale';
import JournalEntries from '@/pages/JournalEntries';
import FinancialStatements from '@/pages/FinancialStatements';
import ChartOfAccounts from '@/pages/ChartOfAccounts';
import Ledger from '@/pages/Ledger';
import Balance from '@/pages/Balance';
import AccountingReports from '@/pages/AccountingReports';

export const CoreRoutes = () => (
  <>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/accounting" element={<Accounting />} />
    <Route path="/journal-comptable" element={<JournalComptablePage />} />
    <Route path="/grand-livre" element={<GrandLivrePage />} />
    <Route path="/balance-generale" element={<BalanceGeneralePage />} />
    <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
    <Route path="/financial-statements" element={<FinancialStatements />} />
    <Route path="/journal-entries" element={<JournalEntries />} />
    <Route path="/ledger" element={<Ledger />} />
    <Route path="/balance" element={<Balance />} />
    <Route path="/accounting-reports" element={<AccountingReports />} />
    <Route path="/contacts" element={<Contacts />} />
    <Route path="/quotes" element={<Quotes />} />
    <Route path="/invoicing" element={<Invoicing />} />
    <Route path="/purchases" element={<Purchases />} />
    <Route path="/products" element={<Products />} />
    <Route path="/stock" element={<Stock />} />
    <Route path="/treasury" element={<Treasury />} />
    <Route path="/budget" element={<Budget />} />
    <Route path="/employees" element={<Employees />} />
    <Route path="/reports" element={<Reports />} />
    <Route path="/analytics" element={<Analytics />} />
    <Route path="/training-support" element={<TrainingSupport />} />
  </>
);
