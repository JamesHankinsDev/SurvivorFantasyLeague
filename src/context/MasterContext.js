import { AuthProvider } from './AuthContext';
import { CastawaysProvider } from './CastawayContext';
import { FantasyTribesProvider } from './FantasyTribeContext';
import { ScoringProvider } from './ScoringContext';

export default function MasterContext({ children }) {
  return (
    <AuthProvider>
      <CastawaysProvider>
        <ScoringProvider>
          <FantasyTribesProvider>{children}</FantasyTribesProvider>
        </ScoringProvider>
      </CastawaysProvider>
    </AuthProvider>
  );
}
