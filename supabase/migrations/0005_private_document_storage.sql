insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'case-documents',
  'case-documents',
  false,
  26214400,
  array['application/pdf','text/plain','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/jpeg','image/png','image/webp']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "case documents owner read" on storage.objects
for select to authenticated
using (bucket_id = 'case-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "case documents owner insert" on storage.objects
for insert to authenticated
with check (bucket_id = 'case-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "case documents owner update" on storage.objects
for update to authenticated
using (bucket_id = 'case-documents' and (storage.foldername(name))[1] = (select auth.uid())::text)
with check (bucket_id = 'case-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "case documents owner delete" on storage.objects
for delete to authenticated
using (bucket_id = 'case-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
