#!/bin/bash

# Nombre del repositorio
REPO="gcr.io/infra-odyssey-437506-a3"

# Listar todos los digests de las imágenes en el repositorio
DIGESTS=$(gcloud container images list-tags $REPO --format="value(digest)")

# Eliminar cada imagen utilizando su digest
for digest in $DIGESTS; do
  echo "Eliminando imagen con digest: $digest"
  gcloud container images delete "$REPO@sha256:$digest" --force-delete-tags --quiet
done

echo "Todas las imágenes han sido eliminadas del repositorio $REPO."
