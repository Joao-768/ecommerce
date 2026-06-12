import { useNavigate, useParams } from "react-router-dom";
import { getCollections, updateCollection } from "../../../../api/collectionsApi";
import { useEffect, useState } from "react";
import AdminFormWrapper from "../../../../ui/AdminFormWrapper";
import { FormInput } from "../../../../ui/Form";
import { Button } from "../../../../ui/Buttons";

export default function EditCollection() {
    const [collection, setCollection] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCollections()
            .then((data) => {
                const found = data.find(c => c.id === Number(id));
                setCollection(found);
            })
            .catch(() => setCollection(null));
    }, [id]);

    const editHandleChange = (e) => {
        const { name, value } = e.target;
        setCollection((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <AdminFormWrapper title="Edit Collection">
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await updateCollection(collection?.id, collection?.name, collection?.description);
                    alert("Collection Edited");
                    navigate("/admin/collection-management");
                }}
                className="grid gap-6 grid-cols-1"
            >
                <FormInput type="text" name="name" value={collection?.name} onChange={editHandleChange} placeholder="Name" />
                <FormInput type="text" name="description" value={collection?.description} onChange={editHandleChange} placeholder="Description" />

                <div className="flex justify-end gap-4 mt-4">
                    <Button shape="pill" variant="secondary" type="button" onClick={() => navigate("/admin/collection-management")}>Cancel</Button>
                    <Button shape="pill" type="submit">Update Collection</Button>
                </div>
            </form>
        </AdminFormWrapper>
    );
}