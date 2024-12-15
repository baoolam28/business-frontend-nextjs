import { useStore } from "@/context/StoreContext";
import Document from "../../../components/document-page/document-page";
import { useRouter } from "next/navigation";
import StoreLocked from "@/components/store-page/Store-Locked";

export default function page() {

  const { store } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (store) {
      setLoading(false);
    }
  }, [store]);

  if (store && !store.active) {
    return <StoreLocked />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Document />
    </div>
  );
}
