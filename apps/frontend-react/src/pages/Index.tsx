import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { UpdatesPreview } from '@/components/home/UpdatesPreview';
import { CoursesPreview } from '@/components/home/CoursesPreview';
import { SessionsPreview } from '@/components/home/SessionsPreview';
import { CommunityPreview } from '@/components/home/CommunityPreview';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <UpdatesPreview />
      <CoursesPreview />
      <SessionsPreview />
      <CommunityPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;
